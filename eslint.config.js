import js from '@eslint/js'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // ── Ignores ──
  { ignores: ['.output/', '.wxt/', 'node_modules/'] },

  // ── Base: JS recommended ──
  js.configs.recommended,

  // ── TypeScript recommended ──
  ...tseslint.configs.recommended,

  // ── React + browser globals ──
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        browser: 'readonly',
        chrome: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      perfectionist: perfectionistPlugin,
    },
    rules: {
      // ── React hooks best practices ──
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ── TypeScript ──
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-empty-object-type': 'off',

      // ── Import sorting (perfectionist v5) ──
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          newlinesBetween: 0,
          internalPattern: ['^@/.*'],
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
        },
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        { type: 'alphabetical', order: 'asc', ignoreCase: true },
      ],

      // ── General best practices ──
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-duplicate-imports': 'off', // handled by perfectionist
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['warn', 'multi-line'],
    },
  },

  // ── Content scripts & background: allow console.log ──
  {
    files: ['entrypoints/content.ts', 'entrypoints/background.ts', 'lib/extractor.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // ── Prettier: must be last (runs prettier as ESLint rule + disables conflicting rules) ──
  eslintPluginPrettierRecommended,
)
