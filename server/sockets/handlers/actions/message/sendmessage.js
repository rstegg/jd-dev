const models = requireDb
const { User, Message, Thread } = models

const userAttributes = ['id', 'username', 'image']

const sendThreadChatMessage = (io, socket, action) => {
  // TODO: use ramda to get params from payload
  const { text, threadId } = action.payload
  if (!text.length) {
    return //TODO: user tries to send empty string
  }
  // TODO: store users with their socketIds
  Thread.findOne({ where: { uid: threadId }})
  .then(thread => {
    const msgThreadId = thread.id
    const newMessage = { text, contentType: 'text', userId: socket.userId, threadId: msgThreadId }
    return Message.create(newMessage, { plain: true })
    })
    .then(savedMessage =>
      Message.findOne({
        include: [
          {
            model: User,
            attributes: userAttributes
          }
      ],
        where: { id: savedMessage.id }
      })
    )
    .then(message =>
      io.to(threadId).emit('action', {
        type: 'RECEIVE_THREAD_CHAT_MESSAGE',
        payload: {
          message
        }
      })
    )
    .catch(err => console.log('send err', err))
}

module.exports = { sendThreadChatMessage }
