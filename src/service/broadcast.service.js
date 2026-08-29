const WebSocket = require("ws");
const AppError = require("../utils/app-error");

class BroadcastService {

    constructor(connectionManager) {
        this.connectionManager = connectionManager;
    }

    broadcast(message) {

        if (!message || message.toString().trim() === "") {
            throw new AppError(
                "Message cannot be empty",
                400
            );
        }

        this.connectionManager.getAll().forEach((socket) => {

            if (socket.readyState !== WebSocket.OPEN) {
                return;
            }

            try {
                socket.send(message);
            } catch (error) {
                console.error(
                    `Failed to send message: ${error.message}`
                );

                this.connectionManager.remove(socket);
            }
        });
    }
}

module.exports = BroadcastService;