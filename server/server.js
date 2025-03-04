const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

server.listen(3000, () => console.log('WebSocket server running on port 3000'));
