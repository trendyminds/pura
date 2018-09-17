const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
