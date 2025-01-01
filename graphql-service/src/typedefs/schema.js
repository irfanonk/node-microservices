// schema.js
const { gql } = require("graphql-tag");

const typeDefsSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

module.exports = typeDefsSchema;
