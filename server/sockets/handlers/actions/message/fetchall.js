const jwt = require('jsonwebtoken')

const models = requireDb
const { User, Offer, Message } = models

const offerAttributes = ['id', 'state', 'productName', 'price', 'sellerId']
const userAttributes = ['id', 'username', 'image']

const fetchThreadChatMessages = (io, socket, action) => {
  const { threadId } = action.payload
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
  .then(messages =>
    socket.emit('action', {
      type: 'RECEIVE_THREAD_CHAT_MESSAGES',
      payload: {
        messages
      }
    })
  )
}

module.exports = { fetchThreadChatMessages }
