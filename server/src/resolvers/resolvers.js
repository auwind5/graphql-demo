const resolvers = {
  Query: {
    booksForTable: async (_, __, { dataSources }) => {
      return await dataSources.db.getBooks()
    },
  },
  Mutation: {
    modifyBookInfo: async (_, { bookInfo }, { dataSources }) => {
      try {
        const modifiedBookInfo = await dataSources.db.modifyBookInfo(bookInfo)
        return {
          code: 200,
          success: true,
          message: `Successfully updated book information!`,
          bookInfo: modifiedBookInfo,
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
