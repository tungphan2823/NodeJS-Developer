const express = require("express");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
        
    `);

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
