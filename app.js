const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
  console.log("listening to port", port);
});

let io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");

  //receive the data
  socket.on("beginPath", (data) => {
    //data from frontend
    //transfer data to all connected computer
    io.sockets.emit("beginPath", data);
  });
  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});
