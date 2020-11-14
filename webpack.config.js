const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = 'development';
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.(png|jpg|gif|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            ]
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        ]
    },
    devServer: {
        // publicPath: '/build/',
        // contentBase: path.resolve(__dirname, "./build"),
        watchContentBase: true,
        compress: true,
        port: 9005,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
}