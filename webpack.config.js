const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    mode: "development",
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
