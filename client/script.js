/** @format */

// const io = require("socket.io-client");

import { io } from "socket.io-client";
const sendMessage = document.querySelector("#send-message");
const sendRoom = document.querySelector("#send-room");
const inputRoom = document.querySelector("#room");
const inputMessage = document.querySelector("#message");
const form = document.querySelector("#form");

const socket = io("http://localhost:3000");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputMessage.value;
  if (message === "") return;
  displayMessage(message);
  socket.emit("message-send", message); // send message to server
  inputMessage.value = "";
});

socket.on("message-received", (message) => {
  displayMessage(message); // receive message from server and display it
});

sendRoom.addEventListener("click", (e) => {
  e.preventDefault();
  const room = inputRoom.value;
  if (room === "") return;
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}
