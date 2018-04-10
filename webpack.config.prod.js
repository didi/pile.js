const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // context: path.join(__dirname, 'example'),
  entry: {
    js: './example/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'main.js',
    publicPath: '',
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: [
      //     path.resolve(__dirname, 'example'),
      //     path.resolve(__dirname, 'src')
      //   ],
      //   exclude: /node_modules/,
      //   use: [{
      //     loader: "babel-loader",
      //  }],
      // },

      {
        test: [/\.js$/, /\.jsx$/, /\.es6$/],
        include: [
          path.resolve(__dirname, 'example'),
          path.resolve(__dirname, 'src'),
        ],
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
        }],
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        use: [{
          loader: 'file-loader',
        }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader?limit=1000',
        }],
      },
      // ,
      // {
      //   test: [/\.jsx$/, /\.es6$/],
      //   exclude: /(node_modules|bower_components)/,
      //   use: [
      //     { loader: 'babel-loader' }
      //   ]
      // }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.resolve(__dirname, 'example'), 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'example/index.html'),
    }),
  ],
};
