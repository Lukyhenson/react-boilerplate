const path = require('path')
const webpack = require('webpack')
const prod = process.argv.indexOf('-p') !== -1

const entry = prod
  ? [
      './src/main.js'
    ]
  : [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/main.js'
    ]

const config = {
  entry: entry,
  output: {
    path: path.join(__dirname),
    publicPath: prod ? '/prod/' : '/',
    filename: prod ? 'bundle.[hash:12].min.js' : 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-decorators-legacy'
          ],
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: [
            'react-hot-loader',
            'babel?presets[]=react&presets[]=stage-0',
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true,
    hot: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

/*
This code was seperated from the config for multiple reasons.
Other conditional things can be added very simply.
Also, the check for config.plugins is so it is not dependent on the structure above.
*/
process.noDeprecation = true
config.plugins = config.plugins||[];
if (prod) {
  config.plugins.push([
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `'production'`
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]);
} else {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `''`
      }
    })
  );
}

module.exports = config;
