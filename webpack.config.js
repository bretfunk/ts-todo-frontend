const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const prod = env === 'production' || env === 'demo';

const config = {
  mode: prod ? 'production' : 'development',
  optimization: { minimize: prod },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
    hotOnly: true
  },
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.scss',
      '.css',
      '.ttf',
      '.eot',
      '.woff',
      '.woff2',
      '.svg'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: { happyPackMode: true }
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-syntax-typescript',
                '@babel/plugin-syntax-decorators',
                '@babel/plugin-syntax-jsx',
                'react-hot-loader/babel'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|woff2|svg|eot)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: env }),
    new ForkTsCheckerPlugin({ checkSyntacticErrors: true })
  ]
};

if (prod) {
  config.plugins.push(new CopyWebpackPlugin([{ from: './public' }]));
} else {
  config.plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = config;
