# rollup-based-library

### NOTE: This is just an initial alpha release. This software is a work in progress and this alpha release is just for testing purposes. It is recommended to not use this library for building any real projects as of now.

A minimal configuration for creating a rollup based micro-library. 
## Covering:
- Rollup setup
- Production configuration that builds the production bundle to a production build folder in the following formats:
    - IIFE Output for browser
    - ESM output
    - CJS output
- Babel setup
- Unit tests setup
- Configuration for Auto-rerun of test cases on source file change.
- Testing environment configuration
- Production environment configuration for build
- ESLint configuration
    - optionally add eslint configuration
    - add a prominent eslint config rule set (airbnb, standard or google).

## Installing create-rollup-library

```
npm install create-rollup-library -g
```

## Steps for creating the library
- cd into /destination folder and enter the command
    ```
        create-rollup-library library-name
    ```
- library-name folder gets created in destination - destination/library-name

## About the default configuration
- version: The version will be 1.0.0-alpha by default. You can either change this at the time of installation or edit it later in package.json.
- private: true is set in package.json to avoid accidental publishing of the package.

- Some imports from dependencies are not able to be resolved by rollup.
    - > This error frequently occurs with CommonJS modules converted by rollup-plugin-commonjs.

    - https://rollupjs.org/guide/en#error-name-is-not-exported-by-module-

- Running tests in watch mode requires git, so after library is created, make sure to initiate a local git repository by running 
    ```
    git init
    ```
    in the library root directory.
    

### About the default test configuration

- Packages used:
    - "jest": "^23.6.0",
    - "babel-jest": "^23.6.0",
    - "@babel/core": "^7.2.2",
    - "babel-core": "^7.0.0-bridge.0",
    - "@babel/preset-env": "^7.2.3",
- The reasons for having both babel-core and @babel/core: 
    - If you are using babel version 7 you have to install babel-jest with
    npm install --save-dev babel-jest babel-core@^7.0.0-0 @babel/core. (https://github.com/facebook/jest/issues/5525)

    - It is because babel-jest has a dependency one babel-core.
    This results in need for both babel-core as well as @babel/core as dependencies.
    However trying to install babel-core@^7.0.0-0 results in installing "^7.0.0-bridge.0" version of babel-core. The babel-bridge project (https://github.com/babel/babel-bridge) is a solution for easy transition of old projects using babel-core as a dependency from babel-core to the updated scoped package @babel/core.

    - Once babel-jest is updated by the jest team to use scoped babel packages, the above workaround will no longer be needed. So, make sure to check the latest releases and the corresponding release notes of babel-jest once in a while.