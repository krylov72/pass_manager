module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: './tsconfig.json',
    project: './tsconfig.json',
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'react/prop-types': 'off',
  },
}
