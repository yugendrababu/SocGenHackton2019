const path = require('path');

module.exports = {
  mode: 'development',
  entry: () => ({}), // See https://github.com/webpack-contrib/karma-webpack/issues/193
  devtool: 'inline-source-map',
  resolve: {
    modules: ['node_modules', 'src'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: { presets: ['es2015', 'react', 'stage-2'] },
      },
    ],
  },
};
