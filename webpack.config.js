module.exports = {
    entry: {
        novel:["./novel/novel.js"],
        pick:["./pick.test.js"],
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "/dist/"
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            use: [
                { loader: "style-loader"}, // creates style nodes from JS strings
                { loader: "css-loader"},// translates CSS into CommonJS
                { loader: "postcss-loader" },
                { loader: "sass-loader",options:{outputStyle:'compressed'}}// compiles Sass to CSS
            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                'url-loader?limit=10000',
                'img-loader'
            ]
        }
        ]
    }
};