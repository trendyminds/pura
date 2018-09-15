const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
  plugins: [
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
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("postcss-easy-import")({ prefix: "_" }),
                require("postcss-mixins"),
                require("postcss-simple-vars"),
                require("postcss-nested"),
                require("postcss-color-function"),
                require("postcss-hexrgba"),
                require("autoprefixer"),
                require("cssnano")
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
