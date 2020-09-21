/* eslint-disable import/no-extraneous-dependencies  */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

const { babelLoader, entry, resolve } = common;
module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'cheap-eval-source-map',
  resolve,
  entry,
  output: {
    publicPath: '/hot/',
    filename: '[name].js',
  },
  module: {
    rules: [
      babelLoader,
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
    open: true,
    hot: true,
    port: 3000,
    proxy: {
      '*': {
        target: 'http://localhost:3001',
        secure: false,
      },
    },
  },
};