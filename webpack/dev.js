/* eslint-disable import/no-extraneous-dependencies  */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

const port = 3000;
const publicPath = '/hot/';
const backendProxy = 'http://192.168.1.249:3000';

const { babelLoader, cssLoader, tsLoader, entry, resolve } = common;
module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  resolve,
  entry,
  output: {
    publicPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      tsLoader,
      babelLoader,
      cssLoader,
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    publicPath,
    open: true,
    hot: true,
    port,
    proxy: {
      '*': {
        target: backendProxy,
        secure: false,
      },
    },
  },
};
