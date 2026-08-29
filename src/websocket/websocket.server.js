const WebSocket = require("ws");

function createWebSocketServer(server){
    const wss= new WebSocket.Server({
        server
    });

    wss.on("connection", (socket)=>{
        console.log("WEBSOCKET CLIENT CONNECTED");

        socket.on("message",(message)=>{
            console.log("RECEIVED: ",message.toString())
        });


        socket.on("close", ()=>{
            console.log("WEBSOCKET CLIENT DISCONNECTED");
        });

        socket.on("error",(error)=>{
            console.log("WEBSOCKET ERROR: ",error.message);
        });
    });

    return wss;
}

module.exports={createWebSocketServer};