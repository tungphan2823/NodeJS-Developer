const friends = [
  {
    id: 0,
    name: "Max",
  },
  {
    id: 1,
    name: "Johnn",
  },
];
function getFriends(req, res) {
  res.json(friends);
}
function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      error: "name is required",
    });
  }

  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  res.json(newFriend);
}
function getFriend(req, res) {
  const friendId = +req.params.friendId;
  const friend = friends[friendId];
  if (friend) {
    res.json(friend);
  } else {
    res.status(404).json({ error: "friend not found" });
  }
}

module.exports = {
  getFriend,
  getFriends,
  postFriend,
};
