const { RESTDataSource } = require('apollo-datasource-rest')
const { initDBConnection } = require('./database.js')

class TrackAPI extends RESTDataSource {
  constructor() {
    super()
    // the Catstronauts catalog is hosted on this server
    this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/'
  }

  booksForTable() {
    connection.query('select * from book', (error, results, fields) => {
      if (error) throw error
      return results
    })
  }
}

module.exports = TrackAPI
