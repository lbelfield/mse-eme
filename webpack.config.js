const dotenv = require('dotenv');
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

dotenv.config({ path: path.join(__dirname, '.env') });

const { PORT_WEBPACK } = process.env;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['regenerator-runtime/runtime.js', './index.js'],
  devServer: {
    port: PORT_WEBPACK,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mp4', '.m4s', '.mpd'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(mp4|m4s|mpd)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './server/static/index.html', // creates html file in dist
      filename: './index.html',
    }),
  ],
};
