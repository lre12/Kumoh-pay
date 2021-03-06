const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://localhost:3001/',
          changeOrigin: true
      }),
      createProxyMiddleware('/wallet', {
        target: 'http://swj951105.iptime.org:4000/',
        changeOrigin: true
    })
  );
};