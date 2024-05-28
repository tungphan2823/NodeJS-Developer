const path = require("path");
function getMessages(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "skimountain.jpg"));
  // res.send("<ul>Heeello</ul>");
}
function postMessages(req, res) {
  console.log("Updating");
}
module.exports = {
  getMessages,
  postMessages,
};
