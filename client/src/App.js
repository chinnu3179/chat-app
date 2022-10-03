import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat";

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const join_room = () => {
    if (username !== "" && room !== "") {
      console.log(username, room);
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App joinChatContainer">
      <h2>Join a Chat</h2>
      <input
        type="text"
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room Id..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={join_room}>Join Room</button>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
