var express = require('express');
var app = express();
var socket = require('socket.io');
app.configure(function(){
  app.use(express.static(__dirname + '/'));
});
var server = app.listen(3100);
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
	console.log("connnect");
	socket.on('disconnect', function (socket) {
		console.log("disconnect");
	});
	socket.emit("pong",{txt:"Connected to server"});
	setInterval(function(){
		socket.emit("pong",{txt:"push notification!!!!"});
	}, 5000);
	socket.on('ping', function (data) {
		console.log(data.txt);
		socket.emit("pong",{txt:"Pong (from server)"});
	});
});
