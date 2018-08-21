const models = requireDb
const { User, Offer, Message } = models

const offerAttributes = ['id', 'state', 'productName', 'price', 'productId', 'userId', 'sellerId']
const userAttributes = ['id', 'username', 'image']

const joinChatThread = (io, socket, action) => {
  const { threadId, user } = action.payload
  Message.findAll({
    include: [
      {
        model: Offer,
        attributes: offerAttributes
      },
      {
        model: User,
        attributes: userAttributes
      }
    ],
    where: { threadId }
  })
  .then(messages => {
    if (socket.thread) {
      socket.leave(socket.thread)
    }
    socket.join(threadId)
    socket.thread = threadId
    socket.emit('action', {
      type: 'JOIN_THREAD_SUCCESS',
      payload: {
        messages,
        threadId
      }
    })
  })
}

const leaveChatThread = (io, socket, action) => {
  if (action.payload && action.payload.threadId) {
    socket.leave(action.payload.threadId)
  } else if (socket.room) {
    socket.leave(socket.room)
  }
}

module.exports = { joinChatThread, leaveChatThread }
