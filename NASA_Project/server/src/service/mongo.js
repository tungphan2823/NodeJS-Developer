const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}
module.exports = { mongoConnect };
