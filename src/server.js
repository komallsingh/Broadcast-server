const app= require("./app");
const http=require("http");
const env=require("./config/env");
const {createWebSocketServer}=require("./websocket/websocket.server");
const server=http.createServer(app);

createWebSocketServer(server);
server.listen(env.PORT,()=>{
    console.log(`Server is running on port ${env.PORT}`);
});