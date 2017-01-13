/**
 * Created by areshytko on 13.01.17.
 */

var path = require("path");

module.exports = {
    entry: ['babel-polyfill', './src/d3-plot.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'd3-plot.bundle.js',
        libraryTarget: 'var',
        library: 'd3plot'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};