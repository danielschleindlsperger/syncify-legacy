module.exports = {
  webpack: (config, options, webpack) => {
    // don't minify in order to keep timestamp for migration files
    config.optimization.minimize = false

    config.entry.main = ['./src/index.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    }

    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
    })

    return config
  },
}
