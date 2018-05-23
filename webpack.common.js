const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanDirWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const commonConfig = {

    entry: {
        main: './src/index.js',
        vendors: [
            // these libraries will be loaded separately in production
            // TO DO  dynamic ,lazy-load imports
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-thunk',
            'redux-form'

        ]
    },
    output: {// where the bundle file will be exported 
        path: path.resolve(__dirname, 'dist'), //dist folder
        filename: '[name].[hash].js'// main.34214dwq312321.js || vendor.4325341243431.js
    },
    module: {
        rules: [
            {  // load js or react files
                test: /\.(js|jsx)$/,
                include: /src/,
                use: {
                    loader: 'babel-loader'
                }
            }, { //load SCSS
                test: /\.scss$/,
                include: /src/,
                use: [
                    {
                        loader: 'style-loader'// falback to inject css into style tags
                    }, {
                        loader: MiniCssExtractPlugin.loader // prepares css for exctraction from bundle
                    }, {
                        loader: 'css-loader' // handles CSS files into bundle 
                    }, {
                        loader: 'postcss-loader' //post processing and css optimization
                    }, {
                        loader: 'sass-loader'// converts SCSS to CSS
                    }

                ]
            }, {
                test: /\.(png|gif|jpg|jpeg|webp|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: '25000'
                }
            }
        ]
    },
    resolve: {
        //  known extensions  eg import '/styles' instead of import '/styles.css'
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.css',
            '.scss',
            '.html',
            '.gif',
            '.jpeg',
            '.svg',
            '.png',
            '.jpg',
            '.webp'

        ],
        // create  import maps  to  eliminate relative import paths and simplify  file importing across files

        // eg - import 'Styles/styles';  import Components/componentA;
        alias:{

            Actions: path.resolve(__dirname, 'src/actions/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Constants: path.resolve(__dirname, 'src/constants/'),
            Reducers: path.resolve(__dirname, 'src/reducers/'),
            Styles: path.resolve(__dirname, 'src/styles/')
        }
    },
    plugins: [
        new CleanDirWebpackPlugin(['dist'], {}),//cleans the dist directory 
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),// places extracted css into file named :main.42342352523.css
        new HtmlWebpackPlugin({
            inject: true, //injects scripts into body tag
            hash: true,// hashes
            template: './src/index.html',//use predefined templatefile
            filename: 'index.html',//filename of the output
            title: 'Webpack 4 BoilerPlate',//set the title tag
            minify: {//further optimization to compress the file
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                useShortDoctype: true,
                removeRedundantAttributes: true,
                removeComments: true
            }
        }),
        // browser caching handler
        new WebpackMd5Hash()

    ]
};

module.exports = commonConfig;