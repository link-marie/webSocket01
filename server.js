'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const serverHttp = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const serverWs = new Server({ server: serverHttp });

serverWs.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  serverWs.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
