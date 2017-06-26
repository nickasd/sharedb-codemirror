var WebSocket = require('reconnecting-websocket');
var ShareDB = require('sharedb/lib/client');
var CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
var ShareDBCodeMirror = require('../sharedb-codemirror');

require('./style.css');

var ports = {sharedb: 8112, app: 8080};
var debug = false;

var ws, connection, codeMirror, shareDBCodeMirror;

var docs = {};
var activeButton;
function openDoc(doc) {
    shareDBCodeMirror.attachDoc(docs[doc], (error) => {
        if (error) {
            console.error(error);
            return;
        }
        codeMirror.setOption('mode', 'javascript');
        if (activeButton) {
            activeButton.className = '';
        }
        activeButton = document.getElementById(`button${doc}`);
        activeButton.className = 'active';
    });
}

window.onload = (event) => {
    ws = new WebSocket(`ws://${window.location.hostname}:${ports.sharedb}`);
    connection = new ShareDB.Connection(ws);
    codeMirror = new CodeMirror(document.getElementById('textarea'));
    shareDBCodeMirror = new ShareDBCodeMirror(codeMirror, {verbose: debug, key: 'content'});

    docs['1'] = connection.get('docs', 'doc1');
    document.getElementById('button1').onclick = (event) => {
        openDoc('1');
    };
    docs['2'] = connection.get('docs', 'doc2');
    document.getElementById('button2').onclick = (event) => {
        openDoc('2');
    };
    openDoc('1');
}
