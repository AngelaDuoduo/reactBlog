var path = require('path');
var webpack = require('webpack');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
	entry: {
		app: ['webpack/hot/dev-server', './webapp/index.js']
	},
	module: {
		loaders: [{
			test: /\.jsx?/, 
			loader: 'babel',
			exclude: /node_modules/,
			include: path.join(__dirname, 'webapp'),
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.scss$/, 
			loaders: ['style', 'css?modules', 'postcss', 'sass']
		}]
	},
	resolve: {
		alias: {
			'react': path.resolve(nodeModulesPath, 'react/dist/react.min.js'),
			'react-dom': path.resolve(nodeModulesPath, 'react-dom/dist/react-dom.js'),
			'redux': path.resolve(nodeModulesPath, 'redux/dist/redux.js')
		}
	},
	plugins: [
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin()//报错但不退出webpack进程
  	],
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public/javascripts'),
		publicPath: 'http://127.0.0.1:9000/public/javascripts'
	},
	sassLoader: {
		includePath: ['./webapp/style']
	},
	postcss: [require('autoprefixer')],
	devtool: 'eval-source-map'
};

