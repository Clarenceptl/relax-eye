module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    __APP_VERSION: true
  },
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended-legacy',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['jsdoc', 'sonarjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json'
  },
  rules: {
    eqeqeq: ['error', 'always'],
    'no-duplicate-imports': 'warn',
    'no-use-before-define': 'off', // NOTE: cette règle sert à éviter des conflits de règles avec typescript-eslint (cf. https://typescript-eslint.io/rules/no-use-before-define)
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    'comma-dangle': ['error', 'never'],
    'jsdoc/no-undefined-types': 1,
    'max-classes-per-file': ['warn', 1],
    'vue/multi-word-component-names': 0,
    'vue/v-on-event-hyphenation': ['error', 'never']
  }
};
