const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

module.exports = (env, options) => {

    setEnvVals(options.mode);

    return {
        mode: 'development',

        resolve: {
            extensions: ['.js', '.jsx']
        },

        entry: {
            app: path.join(__dirname, 'index.js')
        },

        module: {
            rules: [
                {
                    test: /\.jsx?/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-proposal-class-properties", "react-hot-loader/babel"],
                    }
                }
            ]
        },

        plugins: [
            new webpack.EnvironmentPlugin(['GOOGLE_MAP_API_KEY'])
        ],

        output: {
            filename: 'app.js',
            path: path.join(__dirname, 'dist'),
            publicPath: '/dist'
        }
    }
}


function setEnvVals(mode) {
    let envFileSurfix = '';

    switch (mode) {
        case 'production':
            envFileSurfix = 'prod';
            break;
        case 'development':
            envFileSurfix = 'dev';
            break;
        default:
            envFileSurfix = 'local';
            break;

    }

    dotenv.config(
        {
            path: `${__dirname}/.env.${envFileSurfix}`
        }
    );
}