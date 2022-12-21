const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type Query {
    me: User
  }
  type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(input: saveBookInput): User 
      login(email: String!, password: String!): Auth
        removeBook(bookId: String!): User 
  }
  input saveBookInput {
      description: String!
      title: String!
      bookId: String!
      image: String
      link: String
      authors: [String]
  }
  type User {
    _id: ID!
    email: String!     
    username: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
      bookId: String!
      description: String!
      title: String!
      image: String
      authors: [String]
      link: String
  } 
  
  type Auth{
      token: String!
      user: User
  }
`;

module.exports = typeDefs;