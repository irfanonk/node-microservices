const { gql } = require("graphql-tag");

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    createdAt: String!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = userTypeDefs;
