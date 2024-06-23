const app = require("./app");
const http = require("http");
const { loadPlanetData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:Fawmf6XLFiO0R7fX@nasacluster.mny8tcq.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster";

const server = http.createServer(app);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
startServer();
