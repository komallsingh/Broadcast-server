const app= require("./app");
const http=require("http");
const env=require("./config/env");
const {createWebSocketServer}=require("./websocket/websocket.server");
const server=http.createServer(app);

const wss=createWebSocketServer(server);
server.listen(env.PORT,()=>{
    console.log(`Server is running on port ${env.PORT}`);
});

function shutdown(signal) {

    console.log(
        `${signal} received. Shutting down gracefully...`
    );

    // Stop accepting new HTTP connections
    server.close(() => {

        console.log("HTTP server closed");

        // Close all WebSocket clients
        for (const client of wss.clients) {
            client.close();
        }

        // Close WebSocket server
        wss.close(() => {

            console.log("WebSocket server closed");

            process.exit(0);
        });
    });
}

process.on("SIGINT", () => {
    shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});