const resolvers = {
  Query: {
    booksForTable: async (_, __, { dataSources }) => {
      return await dataSources.db.getBooks()
    },
  },
  Mutation: {
    addBook: async (_, { bookInfo }, { dataSources }) => {
      console.log('======bookInfo', bookInfo)
      const addBookRes = await dataSources.db.addBook(bookInfo)
      console.log('======addBookRes', addBookRes)
      return {
        code: 200,
        success: true,
        message: `Successfully added book information!`,
        bookInfo,
      }
    },
    modifyBookInfo: async (_, { bookInfo }, { dataSources }) => {
      try {
        const modifiedBookInfo = await dataSources.db.modifyBookInfo(bookInfo)
        return {
          code: 200,
          success: true,
          message: `Successfully updated book information!`,
          bookInfo: bookInfo,
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          bookInfo: null,
        }
      }
    },
  },
}

module.exports = resolvers
