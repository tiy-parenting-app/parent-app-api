'use strict';
const Event = use('Event');

module.exports = (server) => {
  const io = use('socket.io')(server);
  const rooms = {};

  io.on('connection', (socket) => {
    socket.on('join', (roomName) => {
      console.log('user joined: ' + roomName);

      Event.on('message.create', function*(message) {
        const m = message.toJSON();

        console.log(m.conversation.id, roomName);
        if (parseInt(m.conversation.id) === parseInt(roomName)) {
          socket.broadcast
            .emit('message', m);
        }
      });
    });

    socket.on('leave', (roomName) => {
      Event.removeListeners(rooms[roomName]);
    });

    console.log('connection created >>>');
  });
};
