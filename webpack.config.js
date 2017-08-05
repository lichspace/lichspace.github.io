module.exports = {
    entry: {
        novel:["./novel/novel.js"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "novel.js",
        publicPath: "/dist/"
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
};