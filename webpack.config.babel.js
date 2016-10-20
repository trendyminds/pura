import path from 'path';
import webpack from 'webpack';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';

const PROD = process.env.NODE_ENV || 0;

module.exports = {
  devtool: false,

  entry: {
    'home': './app/assets/scripts/Home.js',
    'common': [
      'picturefill',
      './app/assets/_compiled/modernizr'
    ]
  },

  output: {
    path: __dirname + '/app/assets/_compiled',
    publicPath: '/app/assets/_compiled',
    filename: '[name].js',
    chunkFilename: '[name]_[chunkhash].js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: PROD ? true : false,
      output: {
        comments: false
      }
    }),

    new CommonsChunkPlugin({
      name: "common",
      minChunks: 3
    })
  ],

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
