/* eslint-env node */
;`use strict`

// const webpack = require(`webpack`)
const path = require(`path`)

const { createWidgetProxy } = require(`./misc/create-widget-proxy`)

module.exports = {
  entry: {
    login: path.join(__dirname, `src/login/index.js`),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, `dist`),
    chunkFilename: '[name].bundle.js',
    publicPath: `__dist/`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: `babel-loader`,
        },
      },
    ],
  },
  devServer: {
    publicPath: `/__dist/`,
    proxy: createWidgetProxy({ target: `http://localhost:8765` }),
  },
}
