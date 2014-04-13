'use strict';

var socket = require('socket.io');

function setupSocketIO(app){ 

	var io = socket.listen(app);

	io.sockets.on('connection', function (socket) {

	    socket.on('viewPost', function (room) {
	        socket.join(room);
	    });
	    socket.on('comment', function (data) {
	        io.sockets.in(data.post).emit('comment', data.msg);
	    });
	});
}

module.exports = setupSocketIO;