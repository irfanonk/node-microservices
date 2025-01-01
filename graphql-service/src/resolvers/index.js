const { mergeResolvers } = require("@graphql-tools/merge");
const userResolvers = require("./user.resolvers");
const authorResolvers = require("./author.resolvers");

const helloResolver = {
  Query: {
    hello: () => "Hello, world!",
  },
};

const resolvers = mergeResolvers([
  userResolvers,
  authorResolvers,
  helloResolver,
]);

module.exports = resolvers;
