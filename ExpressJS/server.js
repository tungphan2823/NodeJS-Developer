const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/message", (req, res) => {
  res.send("<ul>Heeello</ul>");
});
app.post("/message", (req, res) => {
  console.log("Updating");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
