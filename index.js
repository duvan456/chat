// index.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Inicializa la aplicación de Express
const app = express();

// Crea un servidor HTTP
const server = http.createServer(app);

// Inicializa Socket.IO con el servidor
const io = socketIo(server);

// Configura la ruta principal
app.get("/", (req, res) => {
    res.send("Chat Server is running");
});

// Configura el evento de conexión de Socket.IO
io.on("connection", (socket) => {
    console.log("New client connected");

    // Escucha por mensajes del cliente
    socket.on("message", (data) => {
        // Envía el mensaje a todos los clientes conectados
        io.emit("message", data);
    });

    // Maneja la desconexión del cliente
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Escucha en el puerto 4000
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
