const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  target: 'node',
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
  stats: 'minimal',
}
