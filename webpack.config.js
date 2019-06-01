const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/components/App/App.jsx',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router', 'moment'],
  },
  output: {
    path: './static',
    filename: 'app.bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    },{
			test:/\.css$/,
			loader:'style-loader!css-loader'
		},
    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=512' },
  ],
  },
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api/*': {
        target: 'http://localhost:80'
      },
    },
    historyApiFallback: true,
  },
  'devtool': 'source-map', // eslint-disable-line
};
