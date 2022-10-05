import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

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
      await socket.emit("send_message", data);
      setChatList((list) => [...list, data]);
      console.log(chatList)
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatList((chatList) => [...chatList, data]);
      console.log(chatList)
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat Box</p>
      </div>
      <div className="chat-body">
        {chatList.map((chat) => {
          return (
            <div id={username === chat.author ? "you" : "other"}>
              <p>{chat.message}</p>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
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
