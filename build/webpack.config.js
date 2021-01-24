'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成index.html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const distPath = '../dist';

module.exports = {
    mode: "development",
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true','/build/index.js'],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, distPath),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            title: 'Vue'
        }),
        new webpack.HotModuleReplacementPlugin(),

    ],
    watch:true,
}