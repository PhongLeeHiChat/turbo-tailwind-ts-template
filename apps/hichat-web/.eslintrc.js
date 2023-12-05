module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'custom/next',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
};
