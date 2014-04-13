'use strict';

var socket = require('socket.io');

function setupSocketIO(app){ 

	var io = socket.listen(app.listen(8001));

	io.sockets.on('connection', function (socket) {
	    socket.on('post', function (room) {
	        socket.join(room);
	    });
	    socket.on('comment', function (data) {
	        io.sockets.in(data.post).emit('comment', data.msg);
	    });
	});
}

module.exports = setupSocketIO;