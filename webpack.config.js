const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PRODUCTION = false;

module.exports = {
    entry: "./src/scripts/main.js",
    mode :  (PRODUCTION ? 'production' : 'development'),
    devtool : (PRODUCTION ? undefined : 'eval-source-map'),
    output: {
        path: path.resolve("./build"),
        filename: "scripts/bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/style/*.css",
                    to: "style/[name].css"
                }
            ]
        })
    ],
    devServer: {
        static: {
            publicPath: path.resolve(__dirname, "dist"),
            watch: true
        },
        host: "localhost",
        port: "8080",
        open: true
    }
}
