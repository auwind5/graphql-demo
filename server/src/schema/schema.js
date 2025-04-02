const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Query to get books array for the homepage table"
    booksForTable: [Book]
  }

  type Mutation {
    addBook(bookInfo: BookArgs!): AddBookResponse!
    modifyBookInfo(bookInfo: BookArgs!): ModifyBookInfoResponse!
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
    BookID: ID
    Author: String
    BookName: String
    City: String
    ShelfID: String
  }
  type MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    bookInfo: Book
  }
  type AddBookResponse implements MutationResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Updated book"
    bookInfo: Book
  }
  type ModifyBookInfoResponse  implements MutationResponse {
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
