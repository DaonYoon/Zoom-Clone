
const welcome = document.querySelector("#welcome")
const form = welcome.querySelector("form")
const room = document.querySelector("#room");

room.hidden = true;  //room은 디스플레이 숨기겠다
let roomName;        


function addMessage(message) {
  const ul = room.querySelector("ul")
  const li = document.createElement("li")
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You : ${input.value}`);
  })
}

function ShowRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = roomName;
  const form = room.querySelector("form")
  form.addEventListener("submit", handleMessageSubmit);
  
}

const socket = io();


function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  console.log(input.value)
  socket.emit("enter_room", input.value, ShowRoom);
  roomName = input.value;
  input.value="";
}

socket.on("welcome", () => {
    addMessage("Somebody Join!")
})

socket.on("bye", () => {
  addMessage("Somebody Exit!");
})

socket.on("new_message", addMessage)
form.addEventListener("submit", handleRoomSubmit)