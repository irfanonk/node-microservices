const { mergeTypeDefs } = require("@graphql-tools/merge");
const typeDefsSchema = require("./schema");
const userTypeDefs = require("./user.typedefs");
const authorTypeDefs = require("./author.typedefs");

const helloTypeDef = `
  type Query {
    hello: String
  }
`;

const typeDefs = mergeTypeDefs([
  typeDefsSchema,
  userTypeDefs,
  authorTypeDefs,
  helloTypeDef,
]);

module.exports = typeDefs;
