const express = require("express");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
const resolversArray = loadFilesSync("**/*", {
  extensions: ["resolvers.js"],
});

async function startApolloServer() {
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}
startApolloServer();
