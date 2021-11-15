'use strict';

const path = require('path');

module.exports = {
    entry: '/platform/web/entry.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'vue.js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules:[
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            }
        ]
    },
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, '/'),
        hot: true,
    }
    
}