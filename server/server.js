/** @format */

const { Socket } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true,
  },
});

io.on("connection", (Socket) => {
  Socket.emit("userId", Socket.id);

  Socket.on("message-send", (message, room) => {
    // listen message from any user
    console.log(message);
    if (room === "") {
      Socket.broadcast.emit("message-received", message); // broadcast to every user
    } else {
      Socket.to(room).emit("message-received", message); // send to specific users
    }
  });
  Socket.on("ping", (n) => console.log(n));
  
  Socket.on("join-room", (room, callback) => {
    Socket.join(room);
    callback(`joined: ${room}`);
  });
});
const userIo = io.of("/user");
userIo.on("connection", (socket) => {
  console.log("Connected to user namespace " + socket.username);
});
userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error("please send token"));
  }
  function getUsernameFromToken(token) {
    return token;
  }
});

instrument(io, { auth: false });
