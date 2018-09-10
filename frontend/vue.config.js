module.exports = {
  baseUrl: '/app',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
