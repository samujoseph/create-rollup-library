#!/usr/bin/env node
/* eslint-disable no-console */
// import packageJSONData from '../package.json';
import path from 'path';
import fs from 'fs-extra';
import { prompt } from 'inquirer';
import { execSync } from 'child_process';
// import { promisify } from 'util';

// const execSyncP = promisify(execSync);

const libraryName = process.argv[2] || '';
if(!libraryName.trim()) {
  console.error("You should specify the app name. Format: create-rollup-library library-name");
  process.exit(1);
}

const targetWorkingDir = process.cwd();
const targetLibraryRootPath =`${targetWorkingDir}/${libraryName}`;
const sourceLibraryRootPath = path.join(__dirname, '../');
const targetLibraryPackageJsonPath = `${targetLibraryRootPath}/package.json`;
const rollupLibraryTemplatePath = `${sourceLibraryRootPath}/rollup-library-template`;
const packageJsonTemplatePath = `${rollupLibraryTemplatePath}/package.json`;


const questions = [
  {
    type: 'confirm',
    name: 'setupEslint',
    message: "Do you want to setup ESLint ? :",
    default: true,
  },
  {
    type: 'confirm',
    name: 'installNodeModules',
    message: "Do you want to install the node nodules automatically after creating the library ? :",
    default: false,
  },
];

async function createRollupLibrary() {
  const packageJSONTemplateData = await fs.readJson(packageJsonTemplatePath);
  fs.ensureDirSync(targetLibraryRootPath);
  await fs.writeJson(
    targetLibraryPackageJsonPath, {
      name: libraryName,
      ...packageJSONTemplateData,
    }, { 
      spaces: 2,
    },
  );

  execSync("npm init", { cwd: targetLibraryRootPath, stdio: 'inherit' });

  const answers = await prompt(questions);
  const { setupEslint, installNodeModules } = answers;

  const packageJSONData = await fs.readJson(targetLibraryPackageJsonPath);

  const filesToCopy = [
    '.gitignore',
    '.babelrc',
    'jest.config.js',
    'rollup.config.js',
    'package.json',
    'src',
    'tests',
    'README.md',
  ];

  packageJSONData.files = [
    "/dist",
    "README.md"
  ];
  
  if (!setupEslint) {
    delete packageJSONData.devDependencies['eslint'];
    await fs.writeJson(
      targetLibraryPackageJsonPath, 
      packageJSONData, { 
        spaces: 2,
      },
    );
  } else {
    const eslintConfigFiles = [ 
      '.eslintrc',
      '.eslintignore',
    ];
    filesToCopy.push(...eslintConfigFiles);
  }
  const copyPromises = filesToCopy.map(fileName => {
    const sourceFilePath =`${rollupLibraryTemplatePath}/${fileName}`;
    const targetFilepath =`${targetLibraryRootPath}/${fileName}`;
    return fs.copy(sourceFilePath, targetFilepath);
  });
  await Promise.all(copyPromises);
  console.log('Files copied successfully!');
  if (installNodeModules) {
    execSync('npm install', { 
      cwd: targetLibraryRootPath, 
      stdio: 'inherit',
    });
  }
}

createRollupLibrary();


// try {
  // const copyPromises = copySourceToTarget.map(srcPath => {
  //   const srcfinalpath =`${sourceLibraryRootPath}${srcPath}`;
  //   const targetfinalpath =`${targetpath}/${libraryName}/${srcPath}`;
  //   return fs.copy(srcfinalpath, targetfinalpath);
  // });
  // Promise.all(copyPromises)
  //   .then(() => {
  //     console.log('Files copied successfully!');
  //   })
//     .then(() => child_process.execSync('npm install', { cwd: libraryName, env: process.env, stdio: 'inherit' }))
//     .catch(err => console.error(err));
// } catch(copyError) {
//   console.log(err => console.error('copyError in catch block: ', err));
// }
