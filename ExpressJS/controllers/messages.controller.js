function getMessages(req, res) {
  res.send("<ul>Heeello</ul>");
}
function postMessages(req, res) {
  console.log("Updating");
}
module.exports = {
  getMessages,
  postMessages,
};
