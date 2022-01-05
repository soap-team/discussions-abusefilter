// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
  },
  external: [
    // Marked as external, its 'require' is removed in mwModule plugin
    './fetch-polyfill',
  ],
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.build.json' }),
  ],
};
