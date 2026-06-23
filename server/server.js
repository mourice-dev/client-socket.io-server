/** @format */

const io = require("socket.io")(3000, () => {
  cors: {
    origin: ["http://localhost:8080"];
  }
});
// io.Server(sever());
io.on("connection", (Socket) => {
  console.log(Socket.id);
});

io.on("data", (message) => {
  console.log(message);
});
