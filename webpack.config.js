const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const srcPath = path.join(__dirname, 'src');

module.exports = (env, options) => {
    setEnvVals(options.mode);

    return {
        mode: 'development',

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': srcPath
            }
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
                        presets: [
                            ['@babel/preset-env', { targets: { chrome: 55 } }],
                            '@babel/preset-react'
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "react-hot-loader/babel"
                        ],
                    }
                },
                {
                    test: /\.s[ac]ss$/,
                    loader: ['style-loader', 'css-loader', 'sass-loader'],
                }
            ]
        },

        plugins: [
            new webpack.EnvironmentPlugin(getEnvKeyList())
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

function getEnvKeyList() {
    const envKeyList = [];

    for (let key in process.env) {
        envKeyList.push(key);
    }

    return envKeyList
}