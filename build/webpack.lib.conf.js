const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


const webpackConfig = merge(baseWebpackConfig, {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    library: 'HeatMap',
    libraryTarget: 'umd',
    path: resolve('dist')
  },
  externals: {
    'Vue': 'Vue'
  },
  module: {
    rules: utils.styleLoaders({
      extract: true,
      usePostCSS: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/index.css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    })
  ]
})
module.exports = webpackConfig

