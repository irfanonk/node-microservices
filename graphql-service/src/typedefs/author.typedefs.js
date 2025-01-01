const { gql } = require("graphql-tag");

const authorTypeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [String!]!
    createdAt: String!
  }

  extend type Query {
    authors: [Author!]!
    author(id: ID!): Author
  }

  extend type Mutation {
    createAuthor(name: String!, books: [String!]!): Author!
    updateAuthor(id: ID!, name: String, books: [String!]): Author
    deleteAuthor(id: ID!): Boolean
  }
`;

module.exports = authorTypeDefs;
