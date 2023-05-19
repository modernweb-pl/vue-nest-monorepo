const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  e2e: {
    baseUrl: 'http://localhost:4173',
    specPattern: 'tests/e2e/specs/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
  },
});
