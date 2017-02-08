const webpack = require("webpack");
const METADATA = {
  host: "localhost",
  port: 3000
};
module.exports = {
  entry: [
    `webpack-dev-server/client?http://${METADATA.host}:${METADATA.port}`,
    `${__dirname}/src/app.js`
  ],
  debug: true,
  devtool: "cheap-module-eval-source-map",
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "index.js"
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      "./node_modules/"
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  devServer: {
    contentBase: __dirname,
    noInfo: true,
    inline: true,
    historyApiFallback: true,
    port: METADATA.port,
    host: METADATA.host,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
