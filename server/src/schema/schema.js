const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    booksForTable: [Book]
  }

  type Mutation {
    modifyBookInfo(bookInfo: BookArgs!): modifyBookInfoResponse!
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Book {
    "The track's title"
    BookID: ID
    "The track's main Author"
    Author: String
    "The track's illustration to display in track card or track page detail"
    BookName: String
    "The track's approximate length to complete, in minutes"
    City: String
    "The number of modules this track contains"
    ShelfID: String
  }

  "A track is a group of Modules that teaches about a specific topic"
  input BookArgs {
    "The track's title"
    BookID: ID
    "The track's main Author"
    Author: String
    "The track's illustration to display in track card or track page detail"
    BookName: String
    "The track's approximate length to complete, in minutes"
    City: String
    "The number of modules this track contains"
    ShelfID: String
  }
  type modifyBookInfoResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    bookInfo: Book!
  }
`

module.exports = typeDefs
