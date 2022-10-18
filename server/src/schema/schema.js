const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Query to get books array for the homepage grid"
    booksForTable: [Book]
  }

  type Mutation {
    modifyBookInfo(bookInfo: BookArgs!): modifyBookInfoResponse!
  }

  type Book {
    "ID of a book"
    BookID: ID!
    "Author of a book"
    Author: String
    "Name of a book"
    BookName: String
    "Which city the book is stored"
    City: String
    "Which shelf the book is placed"
    ShelfID: String
  }

  input BookArgs {
    BookID: ID!
    Author: String
    BookName: String
    City: String
    ShelfID: String
  }
  type modifyBookInfoResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Updated book"
    bookInfo: Book!
  }
`

module.exports = typeDefs
