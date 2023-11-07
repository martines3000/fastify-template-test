module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  rules: {
    // We use this rule to allow `_` as a parameter name for unused parameters,
    // unused destructured array items, and unused variables.
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    // We use this rule to disable checking for unused parameters, unused
    // destructured array items, and unused variables that start with `_`.
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    // Allow unused parameters to be prefixed with `_`.
    'no-underscore-dangle': 'off',
    // We don't use this rule because it doesn't allow us to use `nullish coalescing`
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'unused-imports/no-unused-imports': 'error',
    // We don't use this rule because default exports are not better than named
    // exports. We should use named exports whenever possible. This way we don't
    // import the same item with different names in different files. This way it's
    // easier to find where the item is imported and helps in big refactors.
    'import/prefer-default-export': 'off',
    // This rules are disabled to allow us to use `any` and `unknown` types
    // in some cases. We should try to avoid using them, but sometimes it's
    // necessary and helps us to avoid unnecessary type casting.
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    // Test and build files are allowed to import devDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.ts', 'build.js', 'vite.config.ts'],
      },
    ],
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
