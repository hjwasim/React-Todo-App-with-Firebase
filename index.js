const express = require("express");
const http = require("http");
const SocketIO = require("socket.io");
const cors = require('cors')
const app = express();
const router = require('./router')

const server = http.createServer(app);
app.use(router)
app.use(cors())
const io = SocketIO(server);

io.on("connection", (socket) => {
  const { id } = socket.client;
  console.log(`User Joined: ${id}`);
  socket.on("chat message", ({ nickname:n, msg }) => {
    io.emit("chat message", { n, msg });
  });
  socket.on("typing",({name,key}) => {
    if(key !== 'Enter'){
    socket.broadcast.emit("typing",name)
    } else if(key === 'Enter'){
      socket.broadcast.emit("typing",null)    }
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

// const express = require("express");
// const http = require("http");
// const SocketIO = require("socket.io");
// const router = require("./router");

// let app = express();
// app.use(router);

// const server = http.createServer(app).listen(4000, () => {
//   console.log("Server Port Started Listening...");
// });

// const io = SocketIO(server);

// io.on("connection", (socket) => {
//   console.log("Socket connection made susccefully!!");
//   socket.on("join", ({ username, room }) => {
//     console.log(username, room);
//   });

//   socket.on("disconnect", () => {
//     console.log("User left the Chat");
//   });
// });
