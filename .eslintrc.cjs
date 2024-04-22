module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    "plugin:cypress/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.*'],
  plugins: ['react-refresh', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx']
      }
    }
  },
  rules: {

  },
  rules: {
    // From Vite
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // From https://gitlab.com/ska-telescope/templates/ska-react-webapp-skeleton/-/blob/1.0.0/.eslintrc.js?ref_type=tags
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/comma-dangle': 1,
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': 0,
    'consistent-return': 1,
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'max-len': 'off',
    'no-bitwise': 'off',
    'no-console': 2,
    'no-param-reassign': 'off',
    'no-plusplus': 0,
    'no-return-assign': 'off',
    'no-restricted-imports': [
      'error',
      {
        name: 'prop-types',
        message: 'Please add TypeScript typings to props instead.'
      }
    ],
    'no-shadow': 'off',
    'object-curly-newline': 'off',
    'react/display-name': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-no-bind': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 1,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ],
    // Custom
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
}