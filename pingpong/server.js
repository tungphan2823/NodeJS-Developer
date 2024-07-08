const apiServer = require("./api");
const http = require("http");
const httpServer = http.createServer(apiServer);

const sockets = require("./sockets");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;
server.listen(PORT);
sockets.listen(io);
console.log(`listening on port ${PORT}`);
