const WebSocket = require("ws");
const ConnectionManager=require("./connection-manager");
const BroadcastService=require("../service/broadcast.service");
const handleWebSocketError = require("./websocket-error-handler");

function createWebSocketServer(server){
    const wss= new WebSocket.Server({
        server
    });
const connectionManager=new ConnectionManager();
const broadcastService=new BroadcastService(connectionManager);

    //socket represents a single client connection
    wss.on("connection", (socket)=>{
        console.log("WEBSOCKET CLIENT CONNECTED");
        connectionManager.add(socket);
        console.log(
            `Active clients: ${connectionManager.count()}`
        );

        socket.on("message",(message)=>{
            console.log("RECEIVED: ",message.toString())

            try{
                broadcastService.broadcast(message.toString());
            }
            catch(error){
                handleWebSocketError(socket,error);
            }
        });


        socket.on("close", ()=>{
            connectionManager.remove(socket);
            console.log("WEBSOCKET CLIENT DISCONNECTED");
            console.log(
            `Active clients: ${connectionManager.count()}`
        );

        });

        socket.on("error",(error)=>{
            console.log("WEBSOCKET ERROR: ",error.message);
        });
    });

    return wss;
}

module.exports={createWebSocketServer};