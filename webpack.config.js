'use strict'

const co = require('co')
const globby = require('globby')

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')

const genConfig = co.wrap(function* () {
  const pages = yield globby(__dirname + '/src/algorithms/*/index.js')

  const entryPoints = pages.reduce( (prev, curr, i) => {
    const name = curr
      .replace(__dirname, '')
      .replace('/src/algorithms/', '')
      .replace('/index.js', '')

    prev[name] = curr

    return prev
  }, {})

  const config = {
    entry: entryPoints,
    output: {
      path: 'dist',
      filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }]
    },
    plugins: [new HtmlWebpackPlugin()]
  }

  return config
})

module.exports = genConfig()
