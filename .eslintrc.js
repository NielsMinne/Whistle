module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'no-shadow': 0,
    'no-cycle': 0,
  },
};
