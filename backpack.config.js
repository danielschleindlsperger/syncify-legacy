const DotenvPlugin = require('webpack-dotenv-plugin')

module.exports = {
  webpack: (config, { env }, webpack) => {
    config.entry.main = ['./src/api/index.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    }

    // remove old babel loader
    config.module.rules = config.module.rules.filter(rule => !rule.test.test('asdf.js'))

    // babel loader with custom config (typescript support, etc)
    config.module.rules.push({
      test: /\.(js|ts)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { node: '10.15' },
              useBuiltIns: 'usage',
              modules: false,
              loose: true,
              corejs: '3',
            },
          ],
          '@babel/preset-typescript',
        ],
      },
    })

    if (env === 'development') {
      config.plugins.push(
        new DotenvPlugin({ path: '.env', sample: '.env.example', allowEmptyValues: true }),
      )
    }

    return config
  },
}
