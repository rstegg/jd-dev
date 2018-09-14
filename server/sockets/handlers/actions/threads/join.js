const models = requireDb
const { User, Order, Message, Thread } = models

const orderAttributes = ['name', 'units', 'type', 'status', 'dueDate', 'dueTime', 'caseFileUrls', 'designFileUrls', 'contact', 'occlusion', 'library', 'pontic', 'linerSpacer']
const userAttributes = ['id', 'email', 'image']

const joinChatThread = (io, socket, action) => {
  const { threadId } = action.payload
  Thread.findOne({ where: { uid: threadId }})
  .then(thread =>
    Message.findAll({
      include: [
        {
          model: Order,
          attributes: orderAttributes
        },
        {
          model: User,
          attributes: userAttributes
        }
      ],
      where: { threadId: thread.id }
    })
  )
  .then(messages => {
    socket.join(threadId)
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
