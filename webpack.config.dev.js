const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/js/main.js'),
    output: {
        path: path.join(__dirname, './public/assets/js/'),
        filename: "[name].js"
    },

    devtool: '#inline-source-map',

    module: {

        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['env', { debug: false }]]
                }
              }
            }
        ]
    }
};