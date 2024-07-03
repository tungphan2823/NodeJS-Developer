const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schema = buildSchema(`
        type Query {
          products: [Product]
          orders: [Order]
        }
          type Product {
           id: ID!
            description: String!
            price: Float!
            reviews: [review]
          }
            type review {
              rating: Int!
              comment: String
            }
    type Order {
    date: String!
    subtotal: Float!
    items: [OrderItem]
    }
    type OrderItem {
      product: Product!
      quantity: Int!

    }
    `);
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
