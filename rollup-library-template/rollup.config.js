import fs from 'fs';
import cjsRollupConfig from './config/rollup/cjs.rollup.config';
import esmRollupConfig from './config/rollup/esm.rollup.config';
import iifeRollupConfig from './config/rollup/iife.rollup.config';

const environment = process.env.NODE_ENV;

const configMap = {
  cjs: cjsRollupConfig,
  esm: esmRollupConfig,
  iife: iifeRollupConfig,
};

export const getPackageJSON = () => {
  const packageData = fs.readFileSync('./package.json');
  return JSON.parse(packageData);
};

const packageJSONData = getPackageJSON();
const {
  browser: browserModulePath,
  module: esModulePath,
  main: cjsModulePath,
} = packageJSONData;

const libPathMap = {
  cjs: cjsModulePath,
  esm: esModulePath,
  iife: browserModulePath,
};


export default (commandLineArgs) => {
  const { format } = commandLineArgs;
  const getConfig = configMap[format];
  const libPath = libPathMap[format];
  return getConfig(libPath, environment, commandLineArgs);
};
