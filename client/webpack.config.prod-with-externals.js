const path = require("path");
module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: __dirname + "/public/dist-prod-03/",
    filename: "main.js",
    publicPath: "/dist-prod-03/",
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
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "prop-types": "PropTypes",
    d3: "d3",
    nvd3: "nv"
  }
};
