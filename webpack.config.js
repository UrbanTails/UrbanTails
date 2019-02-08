const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PROJECT_SRC = path.resolve(__dirname, 'client/src');

module.exports = () => {
  return {
    entry: ['./client/src/index.jsx'],
    module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [{
            loader: 'css-loader'
          }]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      modules: [PROJECT_SRC, 'node_modules'],
    },
    output: {
      path: path.resolve(__dirname, 'client/dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              passes: 2,
            },
            ecma: 6,
            mangle: true,
            output: {
              comments: false,
            },
          },
          sourceMap: true,
        }),
      ],
    },
    performance: {
      hints: false,
    },
  }
};