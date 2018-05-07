module.exports = {
  watch: true,
  entry: {
    main: __dirname + '\\src\\assets\\scripts\\_main.js'
  },
  output: {
    path: __dirname + '\\src\\assets\\scripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }
}