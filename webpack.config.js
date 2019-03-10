

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置 dev/online
var WEBPACK_ENV = process.env.WEBPACK_DEV || 'dev';

console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return {
        template:'./src/view/'+name+'.html',
        filename:'dist/view/'+name+'.html',
        inject:true,
        hash:true,
        chunks:[name,'common']
    }
};


var config = {
    entry:{
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'list':['./src/page/list/index.js'],
        'detail':['./src/page/detail/index.js'],
        'cart':['./src/page/cart/index.js'],
        'login':['./src/page/login/index.js'],
        'result':['./src/page/result/index.js'],
        'register':['./src/page/register/index.js'],
        'user-center':['./src/page/user-center/index.js'],
        'user-center-update':['./src/page/user-center-update/index.js']
    },
    output:{
        path:__dirname,
        filename:'./dist/js/[name].js'
    },
    plugins:[
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'dist/js/base.js'
        }),

        //css单独打包
        new Ex("./dist/css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        new HtmlWebpackPlugin(getHtmlConfig('result')),
        new HtmlWebpackPlugin(getHtmlConfig('register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update')),
        new HtmlWebpackPlugin(getHtmlConfig('list')),
        new HtmlWebpackPlugin(getHtmlConfig('detail')),
        new HtmlWebpackPlugin(getHtmlConfig('cart'))

    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: Ex.extract('style-loader', 'css-loader','less-loader')  // 单独打包出CSS，这里配置注意下
            },
            {
                test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=/dist/resource/[name].[ext]'
            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            }
            ]

    },
    devServer: {

        disableHostCheck: true

    }
};
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;

