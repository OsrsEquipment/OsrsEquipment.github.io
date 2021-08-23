module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'vue/experimental-script-setup-vars': 0,
    'vue/valid-v-slot': 0,
    'vue/require-default-prop': 0,
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'default-case': 0,
    'no-mixed-operators': 0,
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  },
};
