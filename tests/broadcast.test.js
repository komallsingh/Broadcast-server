const WebSocket = require("ws");
const BroadcastService = require("../src/service/broadcast.service");

describe("Broadcast Service Test",()=>{
    // REQUIRED
    let connectionManager;
    let broadcastService;

    beforeEach(()=>{
        connectionManager={
            getAll : jest.fn(),
            remove: jest.fn()
        };

        broadcastService=new BroadcastService(connectionManager);
    });

    // TEST 1
    test("should broadcast to all ",()=>{
        const client1={
        readyState:WebSocket.OPEN,
        send: jest.fn()
        };

        const client2={
            readyState: WebSocket.OPEN,
            send: jest.fn()
        };
        connectionManager.getAll.mockReturnValue([
            client1,
            client2
        ]);
        broadcastService.broadcast("hello");
        expect(client1.send).toHaveBeenCalledWith("hello");
        expect(client2.send).toHaveBeenCalledWith("hello");
    });

    //TEST 2: 
    test("should reject an empty message",()=>{
        connectionManager.getAll.mockReturnValue([]);
        expect(()=>{
            broadcastService.broadcast("");
        }).toThrow("Message cannot be empty");
    });

    //TEST 3"
    test("should ignore closed client",()=>{
        const openClient={
            readyState:WebSocket.OPEN,
            send: jest.fn()
        };
        const closedClient={
            readyState: WebSocket.CLOSED,
            send: jest.fn()
        };

        connectionManager.getAll.mockReturnValue([
            openClient,closedClient
        ]);

        broadcastService.broadcast("hello");
        expect(openClient.send).toHaveBeenCalledWith("hello");
        expect(closedClient.send).not.toHaveBeenCalled();
    });

    // TEST 4:
    test("should remove a client when sending fails", () => {
        const workingClient = {
            readyState: WebSocket.OPEN,
            send: jest.fn()
        };

        const brokenClient = {
            readyState: WebSocket.OPEN,
            send: jest.fn(() => {
                throw new Error("Connection failed");
            })
        };

        connectionManager.getAll.mockReturnValue([
            workingClient,
            brokenClient
        ]);

        broadcastService.broadcast("Hello");

        expect(workingClient.send)
            .toHaveBeenCalledWith("Hello");

        expect(connectionManager.remove)
            .toHaveBeenCalledWith(brokenClient);
    });
    test("should do nothing when there are no clients", () => {
        connectionManager.getAll.mockReturnValue([]);

        expect(() => {
            broadcastService.broadcast("Hello");
        }).not.toThrow();
    });
})