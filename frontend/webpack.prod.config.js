const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

console.info('loading webpack production environment');

module.exports = (env = {}) => {
  const isDev = env.isDev;

  config.mode = 'production';
  config.devtool = 'source-map';
  config.output.path = path.resolve(__dirname, 'dist');
  config.output.publicPath='/';
  config.plugins = [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/favicon.png', to: 'assets/' },
      { from: 'src/config/application.json', to: 'config/application.json' },
      { from: 'build/locales', to: 'locales/' },
      { from: 'src/pwa/manifest.json', to: './' },
      { from: 'src/pwa/images', to: './img' },
      { from: 'src/assets/img', to: './img' },
      { from: 'src/app-config.js', to: '.' },
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // Code splitting
    new MiniCssExtractPlugin ('bundle.[hash].css'),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new WorkboxPlugin({
      swDest: 'dist/service-worker.js',
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js,css,json,svg,png}', 'fonts/*.*'],
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
    config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendors:{
          test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            enforce: true,
            chunks: 'all',
            priority: -10,
            reuseExistingChunk: true,
        },
      },
    },
      minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
          output: {
            beautify: false,
            comments: false,
          },
        },
      }),
      ],
  }

  return config;
};
