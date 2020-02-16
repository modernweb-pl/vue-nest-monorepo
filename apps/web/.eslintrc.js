module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/typescript'],
  rules: {},
  overrides: [
    {
      files: ['**/tests/unit/**/*.{j,t}s?(x)', '**/src/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
