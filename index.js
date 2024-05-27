const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.get("/", (req, res) => {
    res.send("Chat Server is running");
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (data) => {

        io.emit("message", data);
    });


    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
