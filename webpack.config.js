var webpack = require('webpack');

var plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = {
  output: {
    path: './dist/',
    publicPath: '/assets/',
    filename: 're-animator.js',
    library: 'ReAnimator',
    libraryTarget: 'umd'
  },
  entry: {
    'reanimator': ['./src/index.js']
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
};
