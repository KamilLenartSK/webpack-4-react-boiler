const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

const developmentConfig = {
    mode: 'development',
    devServer: {// simple dev server running on express ---content is served from memory !!!!
        contentBase:'./dist',//where to serve content from 
        compress: true, // Enable gzip compression for everything served:
        historyApiFallback: true,// routing for single page apps 
        hot: true,// hot module replacement
        open: true,// open a new tab every time you run this server
        inline: true

    },

    plugins: [new DashboardPlugin()]//displays dashboard in your console
}

module.exports = merge(commonConfig, developmentConfig);