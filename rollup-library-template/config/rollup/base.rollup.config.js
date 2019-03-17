import replace from "rollup-plugin-replace";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import path from 'path';

export const getConfig = (libPath, environment, commandLineArgs ) => {
  const { format } = commandLineArgs;
  const showSourceMaps = environment === 'development';
  const sourcemap = showSourceMaps ? 'inline' : false;
  const useTerser = environment === 'production';
  const libEnvExtension = environment === 'production' ? 'prod' : 'dev';
  return {
    input: 'src/index.js',
    output: {
      file: path.join(libPath, '../', `bundle.${format}.${libEnvExtension}.js`),
      format,
      sourcemap,
    },
    plugins: [
      replace({
        ENVIRONMENT: JSON.stringify(environment)
      }),
      resolve(),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {}
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      useTerser && terser(),
     ],

    /* external option - configuration specific option over-rides the default list */
    external: [],

    /*
      watch option - common for all configurations.
      Relevant only if --watch option is present in command line args
    */
    watch: {
      include: ['src/**'],
      exclude: 'node_modules/**',
      clearScreen: true,
    },
  };
};

export default getConfig;

