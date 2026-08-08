const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry:{
        main: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'webpack Boilerplate',
            template: path.resolve(__dirname,'./src/template.html'),
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
    ]
}