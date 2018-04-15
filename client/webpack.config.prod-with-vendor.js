const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.tsx"
  },
  output: {
    path: __dirname + "/public/dist-prod-03-vendor/",
    publicPath: "/dist-prod-03-vendor/",
    chunkFilename: "[name].js"
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + "/public/index-with-vendor.html",
      template: "public/index-with-vendor.template.html"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};
