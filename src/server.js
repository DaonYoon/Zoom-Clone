import express from "express";
import { WebSocketServer } from 'ws';
import http from "http";

const app = express();                     //app을 express 서버로 쓰겠다

app.set("view engine", "pug");            // app의 템플레이트를 pug로 쓴다
app.set("views", __dirname + "/views");   // views의 위치는 현재폴더 + /views에 있다
app.use("/public", express.static(__dirname + "/public"));    // /public 이상의 주소가 입력되면 현재폴더 + /public폴더로 들어간다

app.get("/", (req,res) => res.render("home"));
app.get("/*", (req,res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

//app.listen(3000, handleListen);


const server = http.createServer(app);             //server는 app의 http서버다
const wss = new WebSocketServer({ server });        // wss는 새로운 웹소켓서버다 


wss.on("connection", (socket) => {             // 프론트엔드와 연결됬을때 사용
    console.log("Connected to browser")        
    socket.on("close", () => console.log("SERVER DOWN"));    // 서버가 닫혔을때
    socket.on("message", (message) => {                     // message가 감지되면 출력겠다.
        console.log(message);
    })
    socket.send("Hello!")                            // 프론트로 hello 인사때리겠다.
})
server.listen(3000, handleListen)