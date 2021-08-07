module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',

  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      'babel-module': {},
    },
  },
};
