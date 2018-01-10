//
// # SimpleServer
// A simple server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

var sockets = [];
var players = [];
io.on('connection', function (socket) {
  socket.on('new player', function() {
    sockets.push(socket);
    players.push({x:400, y:400});
    socket.emit('setIndex', sockets.length-1);
  });
  
  socket.on('disconnect', function () {
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1);
    players.splice(index, 1);
  });

  socket.on('message', function (msg) {
    console.log(socket.id + msg);
  });

  socket.on('movement', function(data) {
      
  });
});

function updateSocketIndex() {
  
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
