const path = require('path');

module.exports = {
    entry: {
        app: './client/maker.jsx',
        login: './client/login.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
        loaders: [
            { 
               json: /\.json$/, 
               loader: 'json-loader' 
            }
        ]
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};