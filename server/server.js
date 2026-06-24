/** @format */

const { Socket } = require("socket.io");

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
// io.Server(sever());
io.on("connection", (Socket) => {
  console.log(Socket.id);

  Socket.on("message-send", (message) => {
    // listen message from any user
    console.log(message);
    Socket.broadcast.emit("message-received", message); // broadcast to every user
  });
});
