const proxy = require('http-proxy-middleware');

// 配置proxy代理. 之后只要带/api的前缀url地址, 都会被代理地址替换
module.exports = function(app) {
  app.use(proxy('/api', { 
       target: 'https://result.eolinker.com/XWHkewC202109af5ad44cd0893e8954bba2342eb59f7bbf?uri=' ,
       secure: false,
       changeOrigin: true,
       pathRewrite: {
        "^/api": "/"
       },
       // cookieDomainRewrite: "http://localhost:3000"
    }));
};

