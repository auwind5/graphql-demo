const { SQLDataSource } = require('datasource-sql')

class Database extends SQLDataSource {
  getBooks() {
    return this.knex.select('*').from('Book')
  }
  modifyBookInfo(bookInfo) {
    return this.knex('Book')
      .where('BookID', '=', bookInfo.BookID)
      .update({ ...bookInfo }, [
        'BookID',
        'Author',
        'BookName',
        'City',
        'ShelfID',
      ])
  }
}

module.exports = Database
