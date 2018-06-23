const path = require("path");

const PROD = process.env.NODE_ENV || 0;

module.exports = {
  mode: PROD ? "production" : "development",
  devtool: PROD ? false : "eval-cheap-module-source-map",
  entry: {
    app: "./src/assets/app.js",
    vendor: ["picturefill"]
  },
  output: {
    path: path.resolve(__dirname, "src/_compiled"),
    publicPath: "/_compiled/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
