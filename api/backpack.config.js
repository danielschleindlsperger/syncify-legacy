const DotenvPlugin = require('webpack-dotenv-plugin')

module.exports = {
  webpack: (config, { env }, webpack) => {
    delete config.entry.main
    config.entry.app = ['./src/index.ts']

    config.resolve = {
      extensions: ['.ts', '.mjs', '.js', '.json'],
    }

    // remove old babel loader
    config.module.rules = config.module.rules.filter(rule => !rule.test.test('asdf.js'))

    // babel loader with custom config (typescript support, etc)
    config.module.rules.push({
      test: /\.(mjs|js|ts)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    })

    config.module.rules.push({
      test: /\.(graphql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    if (env === 'development') {
      config.plugins.push(
        new DotenvPlugin({ path: '../.env', sample: '../.env.example', allowEmptyValues: true }),
      )
    }

    return config
  },
}
