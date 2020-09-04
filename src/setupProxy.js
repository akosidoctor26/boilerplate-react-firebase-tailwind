// "proxy": {
//   "/__": {
//     "target": "http://localhost:5000"
//   },
//   "/functions": {
//     "target": "http://localhost:5001"
//   }
// }
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/__',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
};
