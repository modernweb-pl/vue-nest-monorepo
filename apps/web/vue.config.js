const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  outputDir: '../../dist/web',
  lintOnSave: false,
  css: {
    sourceMap: isDev,
  },

  devServer: {
    progress: false,
    // see https://github.com/modernweb-pl/vue-nest-monorepo/issues/10
    hot: false,
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('~app', path.resolve('./src'));

    if (process.argv.some((arg) => arg.includes('report'))) {
      config.optimization.concatenateModules(false);

      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugin('bundle-analyzer').use(
        new BundleAnalyzerPlugin({
          generateStatsFile: true,
        }),
      );
    }
  },
};
