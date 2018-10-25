const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:3000/",
    "webpack/hot/only-dev-server",
    "./src/assets/app.js"
  ],
  output: {
    path: path.resolve(__dirname, "../src/_compiled"),
    publicPath: "http://localhost:3000/_compiled/",
    filename: "[name].js"
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new CleanWebpackPlugin(["../src/_compiled"], {
      allowExternal: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
