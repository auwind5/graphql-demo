const { SQLDataSource } = require('datasource-sql')

const MINUTE = 60

class Database extends SQLDataSource {
  getBooks() {
    return this.knex.select('*').from('Book').cache(MINUTE)
  }
}

module.exports = Database
