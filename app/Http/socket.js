'use strict';
const Event = use('Event');

module.exports = (server) => {
  const io = use('socket.io')(server);
  const rooms = {};

  io.on('connection', (socket) => {
    socket.on('join', (roomName) => {
      console.log('user joined: ' + roomName);

      Event.on('message.create', function*(message) {
        console.log('message: ' + message.conversation.id);

        if (message.conversation.id === roomName) {
          socket
            .emit('message', message.toJSON());
        }
      });
    });

    socket.on('leave', (roomName) => {
      Event.removeListeners(rooms[roomName]);
    });

    console.log('connection created >>>');
  });
};
