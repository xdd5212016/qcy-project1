var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.conf.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var config = require('../config/index.js');

Object.keys(webpackBaseConfig.entry).forEach(function (name) {
  webpackBaseConfig.entry[name] = ['./build/dev-client.js'].concat(webpackBaseConfig.entry[name])
})

var webpackConfig = {
  // https://doc.webpack-china.org/configuration/output/
  output: {
    filename: config.assetsSubDirectory + '/js/[name].js',
    path: config.assetsRoot,
    publicPath: config.dev.assetsPublicPath
  },
  plugins: [
    // https://doc.webpack-china.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
    new ExtractTextPlugin({
      filename: config.assetsSubDirectory + '/css/[name].css',
      allChunks: true
    }),
    // https://doc.webpack-china.org/plugins/commons-chunk-plugin/
    new webpack.optimize.CommonsChunkPlugin({
      names: config.commonsChunkName,
      filename: config.assetsSubDirectory + '/js/[name].js',
      minChunks: 3
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ],
  // https://doc.webpack-china.org/configuration/devtool/
  devtool: 'cheap-module-eval-source-map'
};

module.exports = webpackMerge(webpackBaseConfig, webpackConfig);
