const path = require('path');

module.exports = {
    mode: 'development',

    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: [path.join(__dirname, 'index.js')]
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    },

    plugins: [],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist')
    }
}