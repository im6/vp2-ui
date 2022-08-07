/* eslint-disable import/no-extraneous-dependencies  */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./common');

const { babelLoader, entry, resolve } = common;

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve,
  entry,
  output: {
    path: path.join(__dirname, '../analyze-output'), // todo: merge this somewhere
    filename: '[name].js',
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  ],
};
