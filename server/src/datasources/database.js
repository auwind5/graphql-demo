const { SQLDataSource } = require('datasource-sql')

class Database extends SQLDataSource {
  getBooks() {
    return this.knex.select('*').from('Book')
  }
  modifyBookInfo(bookInfo) {
    return this.knex('Book').where('BookID', '=', bookInfo.BookID).update({
      BookID: bookInfo.BookID,
      Author: bookInfo.Author,
      BookName: bookInfo.BookName,
      City: bookInfo.City,
      ShelfID: bookInfo.ShelfID,
    })
  }
}

module.exports = Database
