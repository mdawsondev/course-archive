module.exports = {
  entry: __dirname + "/src/assets/scripts/main.js",
  output: {
    path: __dirname + "/src/assets/scripts/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}
