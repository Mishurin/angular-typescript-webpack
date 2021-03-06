'use strict';

var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var argv = require('yargs').argv;
var path = require('path');

module.exports = function makeWebpackConfig(options) {
    console.log(options);
    var config = {
        entry: {app: './src/index.ts', vendors: './src/vendors.ts'},
        output: {
            filename: "[name].js",
            path: options.BUILD ? 'dist' : 'dev'
        },
        resolve: {
            root: __dirname,
            extensions: ['', '.ts', '.js', '.json'],
            alias: {
                'app': 'app'
            }
        },
        resolveLoader: {
            modulesDirectories: ["node_modules"]
        },
        module: {
            loaders: [
                {test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader'},
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                    test: /\.scss$/,
                    loader: 'style!css!sass'
                }, {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: 'raw'
                }, {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&minetype=application/font-woff'
                }, {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }, {
                    test: '\.jpg$',
                    exclude: /node_modules/,
                    loader: 'file'
                }, {
                    test: '\.png$',
                    exclude: /node_modules/,
                    loader: 'url'
                }

            ]
        },
        plugins: []
    };
    if (!options.TEST && !options.BUILD) {
        var browserSync = new BrowserSyncPlugin({
            host: 'localhost',
            port: 8080,
            server: {
                baseDir: 'dev'
            },
            ui: false,
            online: false,
            notify: false
        });
        config.devtool = 'source-map';
        config.plugins.push(browserSync);
        config.devServer = {
            contentBase: './dev'
        };
        config.plugins.push(new HtmlWebpackPlugin({
            template: './src/modules/app/index.html',
            inject: 'body',
            hash: true
        }));
    }
    if (options.BUILD) {
        config.plugins.push(new HtmlWebpackPlugin({
            template: './src/modules/app/index.html',
            inject: 'body',
            hash: true
        }));
        config.plugins.push(new webpack.NoErrorsPlugin(),
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(true),
            new CompressionPlugin({
                asset: "{file}.gz",
                algorithm: "gzip",
                regExp: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }));
    }
    if (options.TEST) {
        config.context = path.join(__dirname,'/src');
        config.entry = './index.ts';
        config.module.postLoaders = [
            {
                test: /\.ts$/,
                exclude: [
                    /node_modules/,
                    /spec.ts$/
                ],
                loader: 'istanbul-instrumenter'
            }
        ]
    }
    config.plugins.push(new webpack.DefinePlugin({
        ON_TEST: (argv.NODE_ENV === 'test' || process.env.NODE_ENV === 'test' )
    }));
    return config;
};