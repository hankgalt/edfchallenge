const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map[query]'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        proxy: {
            '/api': {
                target: 'https://dev.powerflex.io',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true,
            }
        },
        historyApiFallback: true,
        port: 5000
    },
    devtool: 'source-map'
}