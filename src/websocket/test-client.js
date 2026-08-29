const WebSocket = require("ws");

const socket = new WebSocket(
    "ws://localhost:8000"
);

socket.on("open", () => {
    console.log("Connected");

    socket.send("Hello Server!");
});

socket.on("message", (message) => {
    console.log(
        "Received:",
        message.toString()
    );
});

socket.on("close", () => {
    console.log("Disconnected");
});

socket.on("error", (error) => {
    console.error(
        "Connection error:",
        error.message
    );
});