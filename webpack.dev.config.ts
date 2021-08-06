// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
const Dotenv = require("dotenv-webpack");

const config: webpack.Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      // tls: false,
      // net: false,
      // path: false,
      // zlib: false,
      // http: false,
      // https: false,
      // stream: false,
      // os: false,
      // "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    // new Dotenv(),
    new webpack.DefinePlugin({
      "process.browser": JSON.stringify(""),
      "process.env.NAMESPACE": JSON.stringify("development"),
      "process.env.CONNECT_IFRAME_URL": JSON.stringify("BASE_CLAY_URL"),
      "process.env.CONNECT_MANAGE_URL": JSON.stringify(
        "BASE_CLAY_URL + /management/index.html"
      ),
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.REACT_APP_MYAPP": JSON.stringify(
        process.env.REACT_APP_MYAPP
      ),
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
};

export default config;
