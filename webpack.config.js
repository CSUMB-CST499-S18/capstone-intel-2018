var webpack = require('webpack');
var path = require('path');


var BUILD_DIR = path.resolve(__dirname, './static');
var APP_DIR = path.resolve(__dirname, 'scripts');


var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'

  },
  
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /(node_modules)/,
        loader : 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
      }
    ]

  },
  
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};

module.exports = config;