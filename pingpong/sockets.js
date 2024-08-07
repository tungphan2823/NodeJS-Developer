let readyPlayerCount = 0;
function listen(io) {
  const pongNameSpace = io.of("/pong");
  pongNameSpace.on("connection", (socket) => {
    let room;
    console.log("a user connected", socket.id);
    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log("Player Ready", socket.id, room);
      readyPlayerCount++;
      if (readyPlayerCount % 2 === 0) {
        pongNameSpace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });
    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason} `);

      socket.leave(room);
      // if (socket.id === room.split("room")[1]) {
      //   pongNameSpace.to(room).emit("gameOver");
      // }
    });
  });
}
module.exports = {
  listen,
};
