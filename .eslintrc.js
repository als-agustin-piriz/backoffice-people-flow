module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
    'prettier', // opcional, si usás Prettier
  ],
  rules: {
    // Tus reglas personalizadas acá
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/react-in-jsx-scope': 'off', // no necesario con Next.js
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
