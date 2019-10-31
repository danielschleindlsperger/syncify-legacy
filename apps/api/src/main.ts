const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

import { server } from './server'

const PORT = process.env.port || process.env.PORT || 4000

server
  .listen({ port: PORT })
  .then(({ port }) => console.log(`Apollo server listening @ http://localhost:${port}`))
