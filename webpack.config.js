var webpack = require('webpack')

module.exports = {
	entry:__dirname +'/src/main.js',
	output:{
		path:__dirname + '/dist/',
		filename:"build.js"
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				use:{
					loader:'vue-loader'
				}
			},{
				test:/\.js$/,
				use:{
					loader:"babel-loader"
				},
				exclude:/node_modules/
			}
		]
	},
	devServer:{
		contentBase:"./",
		historyApiFallback: true,//不跳转
    	inline: true//实时刷新

	}
}