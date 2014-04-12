'use strict'

var io = require('socket.io').listen(app.listen(80));
io.sockets.on('connection', function (socket) {
    socket.on('post', function (room) {
        socket.join(room);
    });
    socket.on('comment', function (data) {
        io.sockets.in(data.post).emit('comment', data.msg);
    });
});