const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    app: './src/index.js',
    vendor: [
      'axios',
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-redux',
    ],
  },

  resolve: {
    modules: ['node_modules', 'src'],
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-2'] },
      },
      {
        test: /\.s?css$/,
        use: [{loader: MiniCssExtractPlugin.loader} , {loader: 'css-loader', options: { minimize: true }} , {loader: 'resolve-url-loader'} , { loader: 'sass-loader?sourceMap'} ],
      },
      { test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/i, loader: 'file-loader?name=img/[name].[ext]' },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist/matching'),
    filename: '[name].bundle.[hash].js',
    pathinfo: true,
    publicPath: '/matching/'
  },

  devServer: {
    port: 5000,
    contentBase: './dist',
    allowedHosts: ['10.0.2.2'],
    proxy: {
      '/matching/api/**': {
        target: 'http://localhost:3001/',
      },
      '/**': {
        target: '/matching/index.html',
        secure: false,
        bypass: function(req, res, opt){
          var jsregexp=/(\/matching\/[a-z]+\.[a-z]+\.[a-zA-Z0-9]+\.js$)/gi

          if(jsregexp.test(req.path)||req.path.indexOf('.css') !== -1 || req.path.indexOf('img/') !== -1 || req.path.indexOf('assets/') !== -1 || req.path.indexOf('fonts/') !== -1){
            return '/matching'
          }
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/matching/index.html';
          }
        },
      },

    },
  },
  optimization : {
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
  },
  plugins: [
    // /* Delete Distribution before building it */
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/favicon.ico', to: './assets' },
      { from: 'src/assets/images', to: './img' },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Code splitting
    new MiniCssExtractPlugin('bundle.[hash].css'),
    // Ignore locales from momentJS
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Watch translation files
    //new WebpackShellPlugin({ onBuildStart: ['node scripts/i18n-scanner --watch'] }),
    new WorkboxPlugin({
      // swSrc: 'src/sw.js',
      swDest: 'dist/service-worker.js',
      globDirectory: 'src/',
      // staticFileGlobs: [
      //   'index.html',
      // ],
      globPatterns: ['**/*.{html,js,css}'],
      globIgnores: ['**/*.spec.js'],
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
