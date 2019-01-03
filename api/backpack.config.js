module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    }

    config.module.rules.push({
      test: /\.ts$/,
      // transpile syncify-config
      exclude: /node_modules\/(?!syncify-config)/,
      loader: 'ts-loader',
    })

    return config
  },
}
