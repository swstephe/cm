'use strict'
const path = require('path')

module.exports = {
  entry: './client/src/main.js',
  output: {
    path: path.resolve(__dirname, 'static/js'),
    publicPath: '/static/js',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: __dirname + '/static',
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/contacts': 'http://localhost:8000'
    }
  }
}