const webpack = require('webpack');
const path = require('path');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
// const ExtractCSS = new ExtractTextPlugin('styles.css');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');
const precss = require('precss');

// 错误输出
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
  devtool: 'cheap-module-source-map', // 生成map文件
  context: path.resolve(__dirname, 'example'),
  entry: {
    main: './index',
  },
  output: {
    filename: 'dist/[name].js',
    chunkFilename: 'dist/[id].[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   include: [
      //     path.resolve(__dirname, 'src/components/badge'),
      //   ],
      //   enforce: 'pre',
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'example'),
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
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
      {
        test: [/\.jsx$/, /\.es6$/],
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.resolve(__dirname, 'example'), 'node_modules'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [precss, autoprefixer];
        },
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new FriendlyErrorsPlugin(),
  ],
  devServer: {
    port: 3004,
    host: '0.0.0.0',
    historyApiFallback: true,
    noInfo: false,
    https: false,
    disableHostCheck: true,
    proxy: {
      changeOrigin: true,
    },
    // stats: 'minimal'
  },
};
