const api = require("./api");
const server = require("http").createServer(api);

const sockets = require("./sockets");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;
server.listen(PORT);
sockets.listen(io);
console.log(`listening on port ${PORT}`);
