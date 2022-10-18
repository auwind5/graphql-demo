require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/schema/schema')
const resolvers = require('./src/resolvers/resolvers')
const Database = require('./src/datasources/database')

const knexConfig = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
}

const db = new Database(knexConfig)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db }),
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at http://localhost:4000
  `)
})
