import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [chatList,setChatList] = useState([]);

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
      await socket.emit("chat_out", data);
      setChatList((chatList)=>[...chatList,data]);
      setMessage("");
    }
  };
  useEffect(()=>{
    socket.on("chat_in", (data)=>{
        console.log(data)
        setChatList((chatList)=>[...chatList,data])
    });
  },[socket]);
  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat Box</p>
      </div>
      <div className="chat-body">
        {
          chatList.map((chat)=>{
            return <p>{chat.message}</p>
          })
        }
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
