const { createConnection, getRepository } = require('typeorm')
const path = require('path')

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const connectDb = () => createConnection({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [
    path.resolve(__dirname, '**', '*.model.js'),
  ],
})

module.exports = {
  connectDb,
  getRepository,
}
