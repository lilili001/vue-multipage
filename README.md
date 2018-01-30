# multi entry pages

## step1: build/util.js
```
exports.getMultiEntry = (globPath) =>{
  var entries = {},basename,pathsrc;
  glob.sync(globPath).forEach( (entry)=>{
      var arr = entry.split('/').slice(-4);
      basename = path.basename(entry,path.extname(entry));
      pathsrc = arr[0] + '/' +arr[1];
      entries[pathsrc+'/'+basename] = entry
  });
  return entries;
};
```

## step2: build/webpack.base.js
```
var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js');
// console.log(entries);
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name]-[hash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
```
## step3:build/webpack.dev.js
```
var pages =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.html');

      for (var pathname in pages) {
          // 配置生成的html文件，定义路径等
          var conf = {
              filename: pathname + '.html',
              template: pages[pathname], // 模板路径
              chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
              inject: true              // js插入位置
          };
          // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
          devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
      }
```
 ## step4:build/webpack.prod.js
 ```
 var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件
 var chunks = Object.keys(entries);
 //-----------------------------------------------
 new webpack.optimize.CommonsChunkPlugin({
       name: 'vendor',
       chunks: chunks,
       minChunks: Infinity
     }),
 //-----------------------------------------------    
 
 var pages =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.html');
 
 for (var pathname in pages) {
     // 配置生成的html文件，定义路径等
     var conf = {
         filename: pathname + '.html',
         template: pages[pathname], // 模板路径
         chunks: ['vendor',pathname ], // 每个html引用的js模块
         inject: true              // js插入位置
     };
     // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
     webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
 }
 ```
 