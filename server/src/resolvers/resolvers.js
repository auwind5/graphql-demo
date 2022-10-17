const resolvers = {
  Query: {
    booksForTable: async (_, __, { dataSources }) => {
      return await dataSources.db.getBooks()
    },
  },
  Mutation: {
    // increments a track's numberOfViews property
    modifyBookInfo: async (_, { bookInfo }, { dataSources }) => {
      try {
        const modifiedBookInfo = await dataSources.db.modifyBookInfo(bookInfo)
        console.log('success++++++++++++')
        return {
          code: 200,
          success: true,
          message: `Successfully updated book information!`,
          bookInfo: modifiedBookInfo,
        }
      } catch (err) {
        console.log('error++++++++++++', err)
        console.log('bookInfo++++++++++++', bookInfo)
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
