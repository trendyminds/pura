const webpack = require("webpack");

const PROD = process.env.NODE_ENV || 0;

module.exports = {
  devtool: PROD ? false : "eval-cheap-module-source-map",
  entry: {
    app: "./src/assets/app.js",
    vendor: ["picturefill"]
  },
  output: {
    path: __dirname + "/src/_compiled",
    publicPath: "/_compiled/",
    filename: "[name].js",
    chunkFilename: "_chunk/[name]_[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: PROD ? true : false,
      output: {
        comments: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "app",
      children: true,
      minChunks: 2
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
