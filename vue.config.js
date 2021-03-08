const path = require("path");
function resolve(dir){
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist',
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
       .set("assets", resolve("src/assets"))
       .set("components", resolve("src/components"))
       .set("network", resolve("src/network"))
       .set("views", resolve("src/views"))
       .set("store", resolve("src/store"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  devServer: {
    open: true,
    host: '0.0.0.0', // 允许外部ip访问
    port: 8081, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      '/api': {
        target: 'http://www.baidu.com/api', //代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 允许跨域
        // ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    } // 代理转发配置，用于调试环境
  }
}
/*vue-cli3下可以通过vue.config.js进行配置*/
