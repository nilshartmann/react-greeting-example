const path = require("path");
module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: __dirname + "/public/dist/",
    filename: "main.js",
    publicPath: "dist/",
    chunkFilename: "[name].js"
  },
  mode: "development",
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
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 8080,
    historyApiFallback: true
  }
};
