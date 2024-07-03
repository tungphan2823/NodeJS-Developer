const express = require("express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typesArray = loadFilesSync(__dirname, "**/*.graphql");
const schema = makeExecutableSchema({
  typeDefs: [typesArray],
});

const root = {
  products: [
    {
      id: "readshoe",
      description: "Red Shoe",
      price: 19.99,
    },
    {
      id: "blueshoe",
      description: "Blue Shoe",
      price: 18.99,
    },
  ],
  orders: [
    {
      date: "2022-02-22",
      subtotal: 37.98,
      items: [
        {
          product: {
            id: "readshoe",
            description: "Old Red Shoe",
            price: 19.99,
          },
          quantity: 2,
        },
        {
          product: { id: "blueshoe", description: "Blue Shoe", price: 18.99 },
          quantity: 1,
        },
      ],
    },
  ],
};
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // for GraphQL Playground interface  // true or false
  })
);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
