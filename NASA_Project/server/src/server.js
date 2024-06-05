const app = require("./app");
const http = require("http");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const { loadPlanetData } = require("./models/planets.model");
async function startServer() {
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
startServer()