var path = require('path');
var fs = require('fs');
// var entries = require('./entries.js');

var dirSrc = path.resolve(__dirname, '../src')
var dirViews = path.resolve(__dirname, '../src/views')

// 单独处理项目首页
// 因为它的结构与其它页面不同
var entriesConfig = [
  {
    entryName: 'index/index',
    entry: path.resolve(dirSrc, 'js/index.js'),
    filename: 'index.html',
    template: path.resolve(dirSrc, 'index.html')
  }
];

var viewPages = fs.readdirSync(dirViews).filter(function (dirName) {
  return fs.statSync(dirViews + '/' + dirName).isDirectory()
})

viewPages.forEach(pageWalk)

// 遍历入口文件夹, 生产入口文件配置
function pageWalk (pageName) {
  var filemark = 'index'
  var pagePath = path.resolve(dirViews, pageName)
  var files = fs.readdirSync(pagePath)
  var fileHTML = filemark + '.html'
  var fileJS = filemark + '.js'
  
  if (files.indexOf(fileHTML) === -1 || files.indexOf(fileJS) === -1) return

  var filename = pageName + '/' + fileHTML
  entriesConfig.push({
    entryName: pageName + '/' + filemark,
    entry: path.resolve(dirViews, pageName, fileJS),
    filename: filename,
    template: path.resolve(dirViews, filename)
  })

  var subDirs = files.filter(function (file) {
    return fs.statSync(pagePath + '/' + file).isDirectory()
  }).map(function (dirName) {
    return pageName + '/' + dirName
  })

  if (subDirs.length) {
    subDirs.forEach(pageWalk)
  }
}
module.exports = {
  entries: entriesConfig,
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  commonsChunkName: ['app', 'vendor', 'manifest'],
  dev: {
    env: require('./dev.env.js'),
    assetsPublicPath: '/'
  },
  build: {
    env: require('./prod.env.js'),
    // 可配置 CDN
    // assetsPublicPath: 'https://monine.github.io/webpack-multi-page/dist/'
    assetsPublicPath: '/'
  }
}
