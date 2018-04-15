const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: __dirname + "/public/dist-prod-04/",
    filename: "[name].[hash].js",
    publicPath: "/dist-prod-04/",
    chunkFilename: "[name].[hash].js"
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
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes",
    d3: "d3",
    nvd3: "nv"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + "/public/index-with-hashes.html",
      template: "public/index-with-hashes.template.html"
    })
  ]
};
