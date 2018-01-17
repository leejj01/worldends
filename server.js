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
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/index.html'));
  //res.render('client/index.html', {});
});

// DB Part
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('openUri', function() {
    console.log("Connected to mongoDB server");
});

mongoose.connect(process.env.DB);

var Node = require('./db/models/node.js');
var DbManager = require('./db/dbmanager.js')(router,Node);

// Game Part
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
    updateSocketIndex(index);
  });

  socket.on('message', function (msg) {
    console.log(socket.id + msg);
  });

  socket.on('movement', function(data) {
    var index = sockets.indexOf(socket);
    
    if(data.left){
      players[index].x -= 5;
    }
    if(data.right){
      players[index].x += 5;
    }
    if(data.up){
      players[index].y -= 5;
    }
    if(data.down){
      players[index].y += 5;
    }
  });
});


setInterval(function() {
  io.sockets.emit('state', players);
}, 1000/60);


function updateSocketIndex(startIndex) {
  for (var i=startIndex; i< players.length; i++) {
    sockets[i].emit('setIndex', i);
  }
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});


