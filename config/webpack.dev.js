const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");

const postCSSPlugins = [
  require("postcss-easy-import")({ prefix: "_" }),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-color-function"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

module.exports = merge(common, {
  entry: [
    "webpack-dev-server/client?http://localhost:3000/",
    "webpack/hot/only-dev-server"
  ],
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  watch: true,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    port: 3000,
    disableHostCheck: true,
    contentBase: path.join(__dirname, "../src")
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: postCSSPlugins
            }
          }
        ]
      }
    ]
  }
});
