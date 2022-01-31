const express = require('express');
const path = require('path');
const db = require('./queries');

const app = express();
const port = 3000;

require('express-ws')(app);

var htmlPath = path.join(__dirname, 'public');
app.use(express.static(htmlPath)); // For serving html assets
app.use(express.json()) // for parsing application/json

const connections = [];

app.get('/messages', db.getMessages);


app.ws('/messages', function(ws, req) {
  connections.push(ws);
  ws.on('message', function(msg) {
    db.createMessage(msg);
    connections.forEach(function (client) {
      client.send(msg);
    });
  });

  ws.on('close', function(msg) {
    const index = connections.findIndex(connection => connection === ws);
    connections.splice(index, 1);
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})