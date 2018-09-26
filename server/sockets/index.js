const { User } = requireDb
const actionHandler = require('./handlers/actions')

// socket.io -> startSockets
module.exports = io => {
  io.on('connection', socket => {
    socket.on('action', action => actionHandler(io, socket, action))
    socket.on('disconnect', () => {
      if (socket.thread) {
        socket.leave(socket.thread)
      }
      if (socket.userId) {
        User.update({ active: false }, { where: { id: socket.userId }, returning: true, plain: true }) //not secure?
        .then(([_, user]) => console.log('New Disconnection', user.id))
        .catch(console.error)
      }
    })
  })
}
