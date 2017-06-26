var http = require('http');
var express = require('express');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
var ShareDB = require('sharedb');

var ports = {sharedb: 8112, app: 8080};

var sharedb = new ShareDB();
var connection = sharedb.connect();
connection.get('docs', 'doc1').create({content: 'Type something ...'});

var server = http.createServer();
var wss = new WebSocket.Server({server: server});
wss.on('connection', (ws, req) => {
    var stream = new WebSocketJSONStream(ws);
    sharedb.listen(stream);
});
server.listen(ports.sharedb, () => {
    console.log(`ShareDB: listening on port ${ports.sharedb}`);
});
var app = express();
app.use(express.static('.'));
app.use(express.static('/../node_modules'));
app.listen(ports.app, () => {
    console.log(`App: listening on port ${ports.app}`);
});
