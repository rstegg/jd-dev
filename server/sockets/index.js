const actionHandler = require('./handlers/actions')

// socket.io -> startSockets
module.exports = io => {
  io.on('connection', socket => {
    socket.on('action', action => actionHandler(io, socket, action))
    socket.on('disconnect', () => {
      if (socket.thread) {
        socket.leave(socket.thread)
      }
    })
  })
}
