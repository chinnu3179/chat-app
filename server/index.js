const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server } = require('socket.io')

app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin : "http://localhost:3000",
        methods : ["GET","POST"],
    },
});

io.on("connection", (socket)=>{
    console.log(`user connected id is - ${socket.id}`)
    socket.on("join_room",(room)=>{
        socket.join(room)
        console.log(`user with id ${socket.id} joined the room ${room}`)
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);
        console.log(`user with id ${socket.id} joined the room ${JSON.stringify(data)}`)
    })
    socket.on("disconnet",()=>{
        console.log("User Dissconnect  "+socket.id)
    })
});

server.listen(3001,()=>{
    console.log("Server Running")
})
