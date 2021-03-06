const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const p = require('@babel/plugin-proposal-class-properties');

const config = {
  context: __dirname,
  entry: {
    main: './frontend/js/index.js',
  },
  watch: process.env.NODE_ENV !== 'production',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000 // is this the same as specifying --watch-poll?
  },
  resolve: { symlinks: false },
  output: {
    path: path.resolve('./frontend/bundles/'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['lodash', p],
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => (
                [
                  require('precss'),
                  require('autoprefixer')
                ]
              )
            },
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new BundleTracker({ filename: './webpack-stats.json' }),
    new HtmlWebpackPlugin({
      title: 'Private Packages Wizard',
      template: './frontend/templates/index.html',
      inject: false,
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.output.filename = '[name]-[hash].js';
  config.plugins = [
    new LodashModuleReplacementPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new BundleTracker({ filename: './webpack-stats.json' }),
    new HtmlWebpackPlugin({
      title: 'Private Packages Wizard',
      template: './frontend/templates/index.html',
      inject: false,
    })
  ];
} else {
  config.mode = 'development';
  config.output.filename = '[name].bundle.js';
  config.devtool = 'cheap-eval-inline-source-map';
  // config.devtool = 'source-map';
  config.plugins = [
    new LodashModuleReplacementPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new BundleTracker({ filename: './webpack-stats.json' }),
    new HtmlWebpackPlugin({
      title: 'Private Packages Wizard',
      template: './frontend/templates/index.html',
      inject: false,
    }),
  ];
}

module.exports = config;
