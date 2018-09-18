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
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  watch: true,
  devServer: {
    hot: true,
    port: 3000,
    proxy: {
      "*": {
        target: "http://pura.test/",
        changeOrigin: true
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
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
