const models = requireDb
const { User, Order, Message, Thread } = models

const orderAttributes = ['name', 'units', 'type', 'status', 'dueDate', 'dueTime', 'scanFileUrls', 'designFileUrls', 'contact', 'occlusion', 'library', 'pontic', 'linerSpacer']
const userAttributes = ['id', 'email', 'image']

const joinChatRoom = (io, socket, action) => {
  const { uid } = action.payload
  if (!socket.uid) {
    User.findOne({ where: { uid, id: socket.userId }})
    .then(user =>
      !user ? Promise.reject('bad user')
      : user
    )
    .then(user => {
      socket.join(user.uid)
      socket.uid = user.uid
      socket.emit('action', {
        type: 'JOIN_ROOM_SUCCESS',
        payload: {
          uid: user.uid
        }
      })
    })
  }
}

const leaveChatThread = (io, socket, action) => {
  if (action.payload && action.payload.threadId) {
    socket.leave(action.payload.threadId)
  } else if (socket.room) {
    socket.leave(socket.room)
  }
}

module.exports = { joinChatRoom, leaveChatThread }
