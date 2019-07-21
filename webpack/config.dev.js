const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());

function relativePath(dir) {
    return path.resolve(appDirectory, dir);
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    performance: {hints: false},
    entry: [
        relativePath('src/index.ts')
    ],
    output: {
        path: relativePath('dist'),
        filename: 'index.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            // {from: 'src/assets', to: 'assets'}
        ]),
        new HtmlWebpackPlugin({
            template: relativePath('src/index.html'),
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

            // 必须让TS加载js文件, 因为个别min.js文件需要与d.ts绑定，把TS和JS的loader分开的话就会报错
            {
                test: /\.(ts|js)$/,
                include: relativePath('src'),
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        cacheDirectory: true,
                        presets: [
                            [
                                "@babel/preset-env",
                                {targets: {browsers: "last 2 versions"}} // or whatever your project requires
                            ],
                            "@babel/preset-typescript"
                        ],
                        plugins: [
                            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                            ["@babel/plugin-proposal-decorators", {legacy: true}],
                            ["@babel/plugin-proposal-class-properties", {loose: true}]
                        ]
                    }
                }
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
