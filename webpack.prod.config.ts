import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import WebpackPwaManifest from "webpack-pwa-manifest";
const Dotenv = require("dotenv-webpack");

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
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
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
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
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
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
};

export default config;
