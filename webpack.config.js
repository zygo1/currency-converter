const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader', options: { cacheDirectory: true } },
            },
        ],
    },
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      open: true
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Currency converter',
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html',
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
}