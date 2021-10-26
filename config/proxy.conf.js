const proxy = require('http-proxy-middleware');

const devServer = 'http://10.188.40.184:8080';
const proxyTable = {
    '/user/': devServer,
};

module.exports = function (app) {
    Object.keys(proxyTable).forEach((uri) => {
        app.use(uri, proxy(uri, { target: proxyTable[uri], changeOrigin: true }));
    });
};
