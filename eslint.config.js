import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/dist/*', '**/node_modules/*'],
  },

  ...tseslint.configs.recommended,

  eslintConfigPrettier,

  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
);