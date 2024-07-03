const express = require("express");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typesArray = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
const resolversArray = loadFilesSync("**/*", {
  extensions: ["resolvers.js"],
});
const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // for GraphQL Playground interface  // true or false
  })
);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
