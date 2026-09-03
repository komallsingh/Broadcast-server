const AppError = require('../utils/app-error');

function handleWebSocketError(socket, error){
    console.error('WebSocket error:', error);

    if(error instanceof AppError){
        socket.send(
            JSON.stringify({
                success: false,
                message: error.message,
            })
        );
        return;
    }
    socket.send(
        JSON.stringify({
            success: false,
            message: 'Internal server error.',
        })
    );
}

module.exports = handleWebSocketError;