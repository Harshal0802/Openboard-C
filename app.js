const express = require("express");
const socket = require("socket.io");

const app = express();

let port = 3000;
let server = app.listen(port, () => {
  console.log("listening to port", port);
});
