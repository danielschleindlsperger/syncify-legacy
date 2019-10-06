import { server } from './server'

const { PORT = 4000 } = process.env

server
  .listen({ port: PORT })
  .then(({ port }) => console.log(`Apollo server listening @ http://localhost:${port}`))
