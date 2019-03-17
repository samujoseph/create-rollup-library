import getBaseConfig from './base.rollup.config';

export default (libPath, environment, commandLineArgs) => {
  const config = getBaseConfig(libPath, environment, commandLineArgs);
  return config;
};
