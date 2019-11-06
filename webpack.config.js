const path = require('path')

module.exports = {
  name: 'deploy',
  mode: 'production',
  entry: './infrastructure/deploy.ts',
  output: {
    filename: 'deploy.js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
  },
  optimization: {
    minimize: false,
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
}
