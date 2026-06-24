/** @format */

// const io = require("socket.io-client");

import { io } from "socket.io-client";
const sendMessage = document.querySelector("#send-message");
const sendRoom = document.querySelector("#send-room");
const inputRoom = document.querySelector("#room");
const inputMessage = document.querySelector("#message");
const form = document.querySelector("#form");
const status = document.querySelector("#status");

const socket = io("http://localhost:3000");
const userSocket = io("http://localhost:3000/user", {
  auth: { token: "test" },
});

userSocket.on("connect_error", (error) => {
  displayMessage(error.message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputMessage.value;
  const room = inputRoom.value;
  if (message === "") return;
  displayMessage(message);

  socket.emit("message-send", message, room); // send message to server
  inputMessage.value = "";
});
socket.on("userId", (id) => {
  const p = document.createElement("p");
  p.textContent = id;
  document.querySelector("#user-id").appendChild(p);
});

socket.on("message-received", (message) => {
  displayMessage(message); // receive message from server and display it
});

sendRoom.addEventListener("click", (e) => {
  e.preventDefault();
  const room = inputRoom.value;
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}
let count = 0;
setInterval(() => {
  socket.volatile.emit("ping", count);
  count++;
}, 100);

status.addEventListener("change", (e) => {
  if (e.target.value) {
    if (e.target.value === "connect") socket.connect();
    if (e.target.value === "disconnect") socket.disconnect();
  }
});
