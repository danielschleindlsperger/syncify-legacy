import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

process.on('unhandledRejection', err => {
  console.error(err)
  throw err
})
