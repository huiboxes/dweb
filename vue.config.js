const URL = 'http://192.168.220.120:8081/'

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
