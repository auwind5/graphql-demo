const resolvers = {
  Query: {
    booksForTable: async (_, __, { dataSources }) => {
      return await dataSources.db.getBooks()
    },
  },
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id)
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        }
      }
    },
  },
}

module.exports = resolvers
