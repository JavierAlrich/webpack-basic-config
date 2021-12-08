const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    output:{
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // attributes: false,
                    sources: false,
                    minimize: false
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPack({
            title: 'Webpack App',
            // template es el archivo del que se va a basar para copiarlo en la carpeta dist
            template: './src/index.html',
            // filename por default pone index.html, de esta manera nombrara el archivo que estamos mandando a la carpeta dist.
            //El que viene del "template"
            filename: './index.html'
        }),
        new MiniCssExtract({
            // se pone el "name" entre corchetes para que mantenga el mismo nombre al pasarlo a la carpeta de dist en el build
            // se puede poner [name].[fullhash].css para que cree un id despues del nombre y cambie cada que se hace un cambio para evitar el cache
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns:[
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}