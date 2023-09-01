const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// OPTION - add variable for process.env.NODE_ENV

module.exports = {
  // OPTION - add mode: process.env.NODE_ENV
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  devServer: {
    // OPTION - add static directory where files can be served from
    // static: {}
    port: 8080,
    hot: true,
    open: true,
    proxy: {
      // localhost:8080/ will point to localhost:3000
      '/': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:3000',
        logLevel: 'debug',
      },
    },
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: './client/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // OPTION - add devtool property
};
