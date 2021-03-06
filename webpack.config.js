'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'eval-source-map',
  // devtool: 'eval',

  entry: [
	'webpack-hot-middleware/client',
	'./js/boot-client' // client app 的進入點
  ],

  //
  output: {
	path: path.join(__dirname, 'build'),
	filename: 'bundle.js',
	publicPath: '/static/'
  },

  //
  plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
  ],

  //
  resolve: {
	alias: {
	},
	// require() 時不用加 .suffix
	extensions: ['', '.js', '.jsx']
  },

  // jx: 記得設定 babel 的 stage=0 才支援最新 es7 語法
  module: {
	loaders: [
		{
		  test: /\.jsx?$/,
		  loader: 'babel',
		  exclude: /node_modules/,
		  include: __dirname,
		  query: {
			  'stage': 0,
			  'plugins': ['react-transform'],
			  'extra': {
				'react-transform': {
				  'transforms': [{
					'transform': 'react-transform-hmr',
					'imports': ['react'],
					'locals': ['module']
				  }, {
					'transform': 'react-transform-catch-errors',
					'imports': ['react', 'redbox-react']
				  }]
				}
			  }
			}
		},

		{
		  test: /\.css$/,
		  loader: "style!css",
		},
	]
  }
};
