const socket = new WebSocket(`ws://${window.location.host}`)   // socket은 `ws://localost:3000가 연결

socket.addEventListener("open", () =>{         // 백엔드와 연결이됬을떄
    console.log("Connected to Server ");
})

socket.addEventListener("message", (message) => {       // message가 감지됬을때 출력하겠다
    console.log("Just got this: ", message.data , "from the server");
})


setTimeout(() => {       // 1초뒤 서버로 메세지 보내겠다
    socket.send("Hello from the browser");
}, 1000)