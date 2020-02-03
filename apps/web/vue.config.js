const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  lintOnSave: false,
  css: {
    sourceMap: isDev,
  },
};
