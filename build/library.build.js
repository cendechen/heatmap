process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackConfig = require('./webpack.lib.conf.js')



webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 发生了错误
  }
  console.log(err)
})
