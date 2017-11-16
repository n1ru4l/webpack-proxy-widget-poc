;`use strict`

const webpack = require(`webpack`)
const path = require(`path`)

const { createWidgetProxy } = require(`./misc/create-widget-proxy`)

module.exports = {
  entry: {
    login: path.join(__dirname, `src/login/index.js`),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, `dist`),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`babel-preset-env`],
          },
        },
      },
    ],
  },
  devServer: {
    publicPath: `/__dist/`,
    proxy: createWidgetProxy({ target: `http://localhost:8765` }),
  },
}
