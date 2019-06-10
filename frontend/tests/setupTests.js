import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

process.on('unhandledRejection', err => {
  console.error(err)
  throw err
})
