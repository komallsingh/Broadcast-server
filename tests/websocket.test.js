const http = require("http");
const WebSocket = require("ws");

const app = require("../src/app");
const {
    createWebSocketServer
} = require("../src/websocket/websocket.server");

describe("WebSocket Server", () => {

    let server;
    let wss;
    let port;

    const clients = new Set();

    beforeAll((done) => {

        server = http.createServer(app);

        wss = createWebSocketServer(server);

        server.listen(0, () => {
            port = server.address().port;
            done();
        });
    });

    afterAll((done) => {

        // Close every client
        for (const client of clients) {
            client.close();
        }

        // Close WebSocket server
        wss.close(() => {

            // Close HTTP server
            server.close(done);
        });
    });

    test("should allow a client to connect", (done) => {

        const client = new WebSocket(
            `ws://localhost:${port}`
        );

        clients.add(client);

        client.on("open", () => {

            expect(client.readyState)
                .toBe(WebSocket.OPEN);

            client.close();
        });

        client.on("close", () => {

            clients.delete(client);

            done();
        });

        client.on("error", done);
    });

    test("should broadcast message to multiple clients", (done) => {

        const client1 = new WebSocket(
            `ws://localhost:${port}`
        );

        const client2 = new WebSocket(
            `ws://localhost:${port}`
        );

        clients.add(client1);
        clients.add(client2);

        let connectedClients = 0;
        let receivedMessages = 0;

        const message = "Hello clients";

        function trySend() {

            connectedClients++;

            if (connectedClients === 2) {
                client1.send(message);
            }
        }

        client1.on("open", trySend);
        client2.on("open", trySend);

        client1.on("message", (data) => {

            expect(data.toString())
                .toBe(message);

            receivedMessages++;

            if (receivedMessages === 2) {
                client1.close();
                client2.close();
            }
        });

        client2.on("message", (data) => {

            expect(data.toString())
                .toBe(message);

            receivedMessages++;

            if (receivedMessages === 2) {
                client1.close();
                client2.close();
            }
        });

        client2.on("close", () => {

            clients.delete(client1);
            clients.delete(client2);

            done();
        });

        client1.on("error", done);
        client2.on("error", done);
    });

    test("should send error response for empty message", (done) => {

        const client = new WebSocket(
            `ws://localhost:${port}`
        );

        clients.add(client);

        client.on("open", () => {
            client.send("");
        });

        client.on("message", (data) => {

            try {

                const response =
                    JSON.parse(data.toString());

                expect(response).toEqual({
                    success: false,
                    message: "Message cannot be empty"
                });

                client.close();

                clients.delete(client);

                done();

            } catch (error) {
                done(error);
            }
        });

        client.on("error", done);
    });
});