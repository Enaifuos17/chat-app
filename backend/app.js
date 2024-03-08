const express = require("express");
const fs = require("node:fs");
const signUpPath = require("./routes/signup");
const loginPath = require("./routes/login");
const updatePath = require("./routes/update");
const cors = require("cors");
const socket = require("socket.io");
var path = require("path");

// dotenv config
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// to deal with the json type
app.use(express.json());
// enocode data
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); // Update this to your frontend URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

// routes
app.use(signUpPath);
app.use(loginPath);
app.use(updatePath);

// run the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// * SOCKETS

const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, "../frontend")));
let socketsConnected = new Set();

// Listen for when a client connects
io.on("connection", onConnected);

function onConnected(socket) {
  console.log(socket.id);
  socketsConnected.add(socket.id);

  io.emit("users", socketsConnected.size);

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    socketsConnected.delete(socket.id);
    io.emit("users", socketsConnected.size);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("feedback", (data) => {
    socket.broadcast.emit("feedback", data);
  });
}
