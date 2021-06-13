const { createProxyMiddleware } = require('http-proxy-middleware');

//Proxy를 사용하여 CORS 이슈를 해결, 포트가 다른 프론트와 백 사이 통신 가능
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};