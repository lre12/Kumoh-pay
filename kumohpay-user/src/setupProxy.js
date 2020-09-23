const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/app', {
          target: 'http://localhost:3001/',
          changeOrigin: true
      })
  )
};