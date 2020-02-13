const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
  lintOnSave: false,
  css: {
    sourceMap: isDev,
  },
  outputDir: '../../dist/web',
  chainWebpack: config => {
    config.resolve.alias.set('~app', path.resolve('./src'));
  },
};
