const app = require("./app");
const http = require("http");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:Fawmf6XLFiO0R7fX@nasacluster.mny8tcq.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster";

const server = http.createServer(app);
const { loadPlanetData } = require("./models/planets.model");
async function startServer() {
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
startServer();
