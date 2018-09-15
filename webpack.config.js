const path = require("path");
const PostCompile = require("post-compile-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Version = require("node-version-assets");

const config = {
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
    new CleanWebpackPlugin(["src/_compiled"]),
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

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devServer = {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      port: 3000
    };
    config.devtool = "eval-cheap-module-source-map";
    config.watch = true;
    config.module.rules.push({
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
              require("autoprefixer")
            ]
          }
        }
      ]
    });
  }

  if (argv.mode === "production") {
    config.plugins.push(
      new PostCompile(() => {
        new Version({
          assets: [
            "./src/_compiled/app.css",
            "./src/_compiled/app.js",
            "./src/_compiled/vendor.js"
          ],
          grepFiles: ["./src/index.html"]
        }).run();
      })
    );
    config.module.rules.push({
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
    });
  }

  return config;
};
