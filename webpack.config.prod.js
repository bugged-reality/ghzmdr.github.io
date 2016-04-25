var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './src/main.js',
	output: {
		path: './',
		filename: '[name].js',
		publicPath: '/'
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: 'style!css?sourceMap!postcss?sourceMap!sass?sourceMap'
			},
			{
				test: /\.(svg|jpg)$/,
				loader: 'url'
			}
		]
	},

	postcss: function() {
		return [autoprefixer]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/html/index.html',
			inject: true
		}),
		new webpack.DefinePlugin({
		    'process.env': {
				'NODE_ENV': JSON.stringify('production')
	    	}
	  	})
	],

	resolve: {
		extensions: ['', '.js', '.jsx', '.scss']
	}
}
