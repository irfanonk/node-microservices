const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { Pool } = require("pg");

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req }) => {
    // Log the incoming request
    // console.log("Incoming Request:", {
    //   method: req.method,
    //   path: req.url,
    //   headers: req.headers,
    // });

    // Return the context object
    return { user: null }; // Example: you can set authenticated user here
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
