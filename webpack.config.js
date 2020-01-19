const path = require('path')
const fs = require('fs')
const WrapperPlugin = require('wrapper-webpack-plugin')
const headerDoc = fs.readFileSync(require.resolve('solid-auth-client/dist-lib/solid-auth-client.bundle.js'), 'utf8') + '\n';

module.exports = {
  mode: "none",
  entry: [
    './src/dokieli.js'
  ],
  output: {
    path: path.join(__dirname, '/scripts/'),
    filename: 'dokieli.js',
    library: 'DO',
    libraryTarget: 'window'
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
    'node-fetch': 'fetch',
    'text-encoding': 'TextEncoder',
    'whatwg-url': 'window',
    'isomorphic-fetch': 'fetch',
    '@trust/webcrypto': 'crypto',
    'solid-auth-client': ['solid', 'auth']
  },
  devtool: 'source-map',

  plugins: [
    new WrapperPlugin({
      header: headerDoc
    })
  ]
}
