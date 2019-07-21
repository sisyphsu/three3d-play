const Path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    performance: {hints: false},
    entry: [
        './src/index.ts'
    ],
    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            // {from: 'src/assets', to: 'assets'}
        ]),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    resolve: {extensions: [".web.ts", ".web.js", ".ts", ".js"]},
    module: {
        rules: [
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                use: ['raw-loader', 'glslify-loader']
            },
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            }, {
                test: /\.css$/,
                exclude: /[\/\\]src[\/\\]/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {loader: 'css-loader'}
                ]
            }
        ]
    }
};
