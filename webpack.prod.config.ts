import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
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
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new webpack.DefinePlugin({
      "process.browser": JSON.stringify(""),
      "process.env.NAMESPACE": JSON.stringify("development"),
      "process.env.CONNECT_IFRAME_URL": JSON.stringify(
        "https://app-clay.3idconnect.org"
      ),
      "process.env.CONNECT_MANAGE_URL": JSON.stringify(
        "https://app-clay.3idconnect.org/management/index.html"
      ),
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.REACT_APP_MYAPP": JSON.stringify(
        process.env.REACT_APP_MYAPP
      ),
    }),
  ],
};

export default config;
