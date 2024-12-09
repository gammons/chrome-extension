import js from '@eslint/js'
import svelteParser from 'svelte-eslint-parser'
import globals from 'globals'

export default [
  // Base configuration
  js.configs.recommended,

  // Svelte-specific configuration
  {
    files: ['**/*.svelte', '*.svelte'],
    languageOptions: {
      parser: svelteParser,
      globals: {
        ...globals.browser,
        ...globals.webextensions
      }
    },
    rules: {
      // Disable the `no-unused-labels` rule for Svelte files
      'no-unused-labels': 'off'
    }
  },

  // JavaScript-specific configuration
  {
    files: ['**/*.js', '*.js'], // Apply to all JS files
    languageOptions: {
      globals: {
        ...globals.browser
      },
      ecmaVersion: 2021, // Use modern ECMAScript features
      sourceType: 'module'
    },
    rules: {
      'no-console': 'off', // Disable errors for using console
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] // Example rule to ignore unused vars starting with '_'
    }
  }
]
