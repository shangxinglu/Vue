'use strict';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../build/webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler,{
    // log:false
}));

app.listen(8080,()=>{
    console.log('webpack middleware start listen 8080...');
})
