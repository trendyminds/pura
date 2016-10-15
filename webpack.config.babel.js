import path from 'path';
import webpack from 'webpack';

const PROD = process.env.NODE_ENV || 0;

module.exports = {
  devtool: PROD ? false : "source-map",

  entry: {
    initial: './app/assets/scripts/Initial.js',
    home: './app/assets/scripts/Home.js'
  },

  output: {
    path: __dirname + '/app/assets/_compiled',
    publicPath: '/app/assets/_compiled',
    filename: '[name].js',
    chunkFilename: '[name]_[chunkhash].js'
  },

  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ] : [],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
