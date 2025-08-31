// eslint.config.js (flat config)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

const ignores = ['dist', 'coverage', 'node_modules'];

export default [
  // Ignorar pastas comuns
  { ignores },

  // Regras base JS
  js.configs.recommended,

  // Regras para arquivos TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // importante em monorepo: fixa a raiz do tsconfig
        tsconfigRootDir: import.meta.dirname,
        // Se você usar regras type-aware depois, adicione "project"
        // project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Use a versão da regra do TS para pegar tips corretos
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Preferir type imports em geral
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },

  // ✅ EXCEÇÃO: Controllers precisam importar DTOs como VALOR (sem "type")
  // para que os decorators existam em runtime (ValidationPipe).
  {
    files: ['**/*.controller.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  // Regras específicas para testes
  {
    files: ['**/*.spec.ts', 'test/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { tsconfigRootDir: import.meta.dirname },
      globals: {
        ...globals.node,
        ...jestPlugin.environments.globals.globals,
      },
    },
    plugins: {
      jest: jestPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Facilita mocks no Jest
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // ✅ EXCEÇÃO: Controllers precisam importar DTOs como VALOR (sem "type")
  {
    files: ['**/*.controller.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

  // ✅ EXCEÇÃO: Strategy precisa do ConfigService em runtime
  {
    files: ['src/auth/jwt.strategy.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },

];
