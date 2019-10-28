module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    // loader: require.resolve('babel-loader'),
    loader: 'babel-loader',
    options: {
      rootMode: 'upward',
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')
  config.stats = 'errors-only'

  config.module.rules.push({
    test: /\.(graphql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  })

  return config
}
