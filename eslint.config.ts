import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'warn',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-require-imports': 'off',
    },
  },
  { ignores: ['.node_modules/*'] },
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
]);
