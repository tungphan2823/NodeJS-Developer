const express = require("express");

const messagesRouter = require("./routes/messages.router");
const friendsRouter = require("./routes/friends.router");
const app = express();
const PORT = 3000;
app.use((req, res, next) => {
  const start = Date.now();

  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
