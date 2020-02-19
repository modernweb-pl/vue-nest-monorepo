const deepmerge = require('deepmerge');
const preset = require('@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset');

module.exports = deepmerge(preset, {
  testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
});
