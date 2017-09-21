const path = require('path')

module.exports = {
  entry: [
    './src/dokieli.js'
  ],
  output: {
    path: path.join(__dirname, '/scripts/'),
    filename: 'do.js',
    library: 'DO',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'whatwg-fetch': 'fetch'
  },
  devtool: 'source-map'
}
