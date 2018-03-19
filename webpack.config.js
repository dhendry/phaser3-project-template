'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: {
        'project': './src/index.js',
        'depsonly': './src/depsonly.js'
    },

    devtool: 'source-map',

    //mode: 'development',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader'
          }/*,
            {
                use: {
                    loader:'babel-loader',
                    options: { presets: ['es2015'] }
                },
                test: /\.js$/,
                exclude: /node_modules/
            }*/
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]

};
