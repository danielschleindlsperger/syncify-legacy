const slsw = require('serverless-webpack')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  target: 'node',
  output: {
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { node: '10.15' },
                useBuiltIns: 'usage',
                loose: true,
                corejs: '3',
              },
            ],
            '@babel/preset-typescript',
          ],
          plugins: [],
        },
      },
    ],
  },
  // externals: slsw.lib.webpack.isLocal ? undefined : /aws-sdk/,
  plugins: [
    // https://github.com/visionmedia/superagent/issues/672#issuecomment-153408805
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
  ],
  stats: 'minimal',
}
