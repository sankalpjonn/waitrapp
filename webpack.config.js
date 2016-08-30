var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['flux', 'react', 'react-dom', 'react-router', 'superagent', 'classnames'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'es2017', 'react'],
        plugins: ['transform-runtime'],
      }
    }, {
      test: /\.js?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      loader: 'style-loader!css-loader!sass-loader!postcss-loader'
    }, {
      test: /\.(png|jpg|svg|ttf)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  postcss: [autoprefixer],

  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
