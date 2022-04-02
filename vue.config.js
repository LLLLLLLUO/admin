module.exports = {
  lintOnSave: false,
  devServer: {
    open: false,
    hot: true,
    port: 9999,
    host: '127.0.0.1',
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        'target': process.env.VUE_APP_SERVE_URL,
        'changeOrigin': true,
        'pathRewrite': {
          [`^${process.env.VUE_APP_BASE_URL}`]: ''
        }
      }
    }
  }
}
