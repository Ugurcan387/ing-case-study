import {esbuildPlugin} from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import replace from '@rollup/plugin-replace';
const replacePlugin = fromRollup(replace);

export default {
  nodeResolve: true,
  files: './test/**/*.test.js',
  plugins: [
    {
      name: 'alias-store-to-mock',
      resolveImport({ source }) {
        if (
          (source.startsWith('.') || source.startsWith('/')) &&
          /(^|\/)store(\.js)?$/.test(source)
        ) {
          return '/test/__mocks__/store.js';
        }

        if (
          (source.startsWith('.') || source.startsWith('/')) &&
          /(^|\/)user-store(\.js)?$/.test(source)
        ) {
          return '/test/__mocks__/userReducer.js';
        }

        if (
          (source.startsWith('.') || source.startsWith('/')) &&
          /(^|\/)language-store(\.js)?$/.test(source)
        ) {
          return '/test/__mocks__/languageReducer.js';
        }
        return undefined;
      },
    },
    replacePlugin({
      preventAssignment: true,
      values: { 'process.env.NODE_ENV': JSON.stringify('test') },
    }),
    esbuildPlugin({
      target: 'es2020',
      define: {
        'process.env.NODE_ENV': '"test"',
        'global': 'globalThis',
      }
    }),
  ],
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    reporters: ['html', 'text', 'lcov'],
    include: ['./src/**/*.js'],
    threshold: { statements: 90, branches: 85, functions: 85, lines: 90 }
  }
};