import React, { useState } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");

  const send_message = async () => {
    if (message !== "") {
      const data = {
        room: room,
        user: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        date: new Date().toDateString(),
      };
      console.log(data);
      await socket.emit("chat", data);
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Type Message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={send_message}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
