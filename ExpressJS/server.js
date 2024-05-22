const express = require("express");
const friends = [
  {
    id: 0,
    name: "Max",
  },
  {
    id: 1,
    name: "John",
  },
];
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = +req.params.friendId;
  const friend = friends[friendId];
  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({ error: "friend not found" });
  }
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
