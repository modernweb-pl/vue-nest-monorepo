module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/typescript'],
  rules: {},
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
