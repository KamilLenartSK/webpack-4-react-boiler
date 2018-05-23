const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common');

const productionConfig = {
    mode: 'production',
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: { // vendors array libraries  are separated here from the main bundle 
                    test: /[\\/]node_modules[\\/]/,// look into node-modules 
                    name: 'vendors',//file name is vendors
                    chunks: 'all',// all libraries
                    minChunks: 2// minimal reference count for each library
                }
            }
        }
    },
    plugins: [new BundleAnalyzerPlugin()] // provides info about bundle size

}

module.exports = merge(commonConfig, productionConfig);