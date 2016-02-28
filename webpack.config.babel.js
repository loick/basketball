import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import vars from 'postcss-simple-vars';
import calc from 'postcss-calc';
import nest from 'postcss-nested';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


import variables from './variables';

const conf = {
    entry: {
        stage: [
            'webpack/hot/only-dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            './js/stage.js'
        ]
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/[name].js'
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'jsx', 'babel?stage=0'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
        ]
    },
    plugins: [ new ExtractTextPlugin('css/app.css', { allChunks: true }) ],
    postcss() {
        return [
            vars({ variables : variables }),
            calc,
            nest,
            autoprefixer({ browsers: ['last 2 versions'] }),
            cssnano
        ];
    },
    eslint: {
        configFile: '.eslintrc'
    }
};

export default conf;