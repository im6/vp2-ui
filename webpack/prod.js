/* eslint-disable import/no-extraneous-dependencies  */
const path = require('path');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./common');

const { entry, resolve, babelLoader, tsLoader, cssLoader } = common;

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  resolve,
  module: {
    rules: [
      tsLoader,
      babelLoader,
      cssLoader,
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CompressionPlugin({
      exclude: /.*/, // use CDN instead of OSS
      algorithm: 'gzip',
      filename: '[path]',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
