const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  lintOnSave: false,
  css: {
    sourceMap: isDev,
  },
  chainWebpack: config => {
    config.resolve.alias.set('~app', path.resolve('./src'));
  },
};
