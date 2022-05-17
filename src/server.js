import http from "http";
import SocketIO from "socket.io";
import express from "express";
import { isObject } from "util";
import { setTimeout } from "timers";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Events : ${event}`);
  })

  
  socket.on("enter_room", (roomName, ShowRoom) => {
  socket.join(roomName);
  ShowRoom();
  socket.to(roomName).emit("welcome");
});
  socket.on("disconnecting", () => { 
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
});
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  })
});








// const sockets = [];
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon"
//   console.log("Connected to Browser ✅");
//   socket.on("close", onSocketClose);
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg)
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//         aSocket.send (`${socket.nickname}: ${mess.payload}`));
//       case "nickname" :
//       socket["nickname"] = message.payload
//     }
//   });
// });
function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
}

httpServer.listen(3000, handleListen);