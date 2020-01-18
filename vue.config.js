
const webpack = require('webpack')
const path = require('path')
const manifest = require('./vendor-manifest.json')
let cpus = require('os').cpus().length
const isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
    return path.join(__dirname, dir)
  }
  
  const plugins = {
    base: [
    // 使用 DllReferencePlugin插件去读取第三方依赖库，加快打包速度
    //   new webpack.DllReferencePlugin({
    //     context: __dirname,
    //     manifest
    //   })
    ],
    production: [],
    development: []
  }
module.exports = {
    // 选项... test 和 production模式都部署在 persona路径下面
    // publicPath: isProduction||process.env.NODE_ENV=='test' ?'/personas/':'./',
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    transpileDependencies: [], //babel-loader 忽略文件
    productionSourceMap: !isProduction, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    /**
 * configureWebpack
 * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
 * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配
 * 置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
 */
    configureWebpack: conf => {
        /* 该配置与默认配置进行合并 */
        conf.plugins = [
            ...conf.plugins,
            ...plugins['base'],
            ...plugins[isProduction?'production':'development']
        ]
        // 关闭 webpack 的性能提示
        // conf.performance = {
        //   hints:false
        // }

	  //警告 webpack 的性能提示
      conf.performance= {
          hints: 'warning',
          //入口起点的最大体积 默认值250000
          maxEntrypointSize: 5000000,
          //生成文件的最大体积 默认值250000
          maxAssetSize: 3000000000,
          //只给出 js 文件的性能提示
          assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
          }
      }
      conf.externals = {
        // jqgrid: 'jqgrid'
      }
    },
    chainWebpack: conf => {
        /* 修改webpack细节 */
        /* 例如新增alias
        *	conf.resolve.alias.set('@img',resolve('src/assets/img'))
        */

       const imagesRule = conf.module.rule('images')
       imagesRule
           .use('image-webpack-loader')
           .loader('image-webpack-loader')
           .options({
               bypassOnDebug: true
           })
           .end()
        conf.resolve.alias
            .set('@utils', resolve('src/utils'))
            .set('@js', resolve('src/assets/js'))
            .set('@css', resolve('src/assets/css'))
            .set('@img', resolve('src/assets/images'))
            .set('@page', resolve('src/pages'))
            .set('@components', resolve('src/components'))
            .set('@', resolve('./src'))
    },
    // css相关配置
    css: {
        extract: isProduction, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        // css预设器配置项
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        loaderOptions: {}, // 向预处理器 Loader 传递选项
        modules: false
    },
    parallel: cpus > 1,

    // 已在其他地方做代理设置，不用下面的写法
    // devServer: {
    //     host: '172.22.41.76',
    //     port: 9090,
    //     open: true, // 构建完打开打开浏览器
    //     proxy: {
    //         '/': {
    //             ws:false, // proxy websockets
    //             target: 'http://172.22.41.80:8880',
    //             // target: 'http://houtai.suishoushuju.net:8120',

    //             pathRewrite: {
    //               '^/': ''
    //             }
    //           },
    //         '/foo': {
    //             target: '<other_url>'
    //         }
    //     }
    // }
}