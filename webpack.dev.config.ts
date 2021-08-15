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
import WebpackPwaManifest from "webpack-pwa-manifest";
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
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "./public/favicon/favicon.ico",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new Dotenv(),
    new WebpackPwaManifest({
      name: "saturn",
      short_name: "saturn",
      icons: [
        {
          src: path.resolve("public/favicon/android-chrome-192x192.png"),
          size: "192x192",
          type: "image/png",
        },
        {
          src: path.resolve("public/favicon/android-chrome-512x512.png"),
          size: "512x512",
          type: "image/png",
        },
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
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
