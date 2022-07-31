module.exports = {
    // 区分生产环境和开发环境，生产环境需要用相对路径./，或者绝对路径/dist/
    // 开发环境不需要路径前缀，直接用/即可
    publicPath: process.env.NODE_ENV === 'production'
    ? '/mailservice/'
    : '/',

    outputDir: 'mailservice', // 输出目录，默认是dist
    
    // 输出的资源的目录 
    assetsDir: 'static',
    // 生产环境是否生成 sourceMap 文件,资源地图,可以定位控制台输出语句所在文件位置
    productionSourceMap: true,
    devServer: {
        proxy: {
            '/api':{
                target:'http://110.40.230.26:8081/',
                ws: true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}