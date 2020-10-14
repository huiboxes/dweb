import path from 'path'
module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src'),
    '/@/': path.resolve(__dirname, './src/views'),
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@utils/': path.resolve(__dirname, './src/utils'),
  },
  optimizeDeps: {
    include: ["lodash"]
  },
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
  // ... 
}