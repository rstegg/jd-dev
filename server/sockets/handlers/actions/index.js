'use strict'
const { User } = requireDb
const jwt = require('jsonwebtoken')
const { path } = require('ramda')

const { sendThreadChatMessage } = require('./message/sendmessage')
const { joinChatThread, leaveChatThread } = require('./threads/join')
const { joinChatRoom } = require('./rooms/join')
const { sendShopOffer, sendProductOffer } = require('./offer/createoffer')
const { acceptOffer, rejectOffer } = require('./offer/editoffer')
const { socketDisconnect } = require('./socket/disconnect')

const authorize = token =>
  new Promise((resolve, reject) =>
    jwt.verify(token.slice(4), process.env.JWT_SECRET, (err, token) =>
      err ? reject('bad token')
      : resolve(token)
    )
  )

const getToken = path(['payload', 'token'])

module.exports = (io, socket, action) => {
  // TODO: use ramda to check the type of action
  if (!action.type) {
    throw new Error('Action type missing')
  }
  if (action.type === 'WS/JOIN_THREAD') {
    return joinChatThread(io, socket, action)
  }

  authorize(getToken(action))
    .then(token => {
      if (token.id) {
        User.update({ active: true }, { where: { id: token.id }, returning: true, plain: true }) //not secure?
        .then(([_, user]) => console.log('New Connection', user.id))
        .catch(console.error)
      }
      socket.userId = token.id //TODO: best answer?
      switch(action.type) {
        case 'WS/JOIN_ROOM':
          return joinChatRoom(io, socket, action)
        case 'WS/SEND_THREAD_CHAT_MESSAGE':
          return sendThreadChatMessage(io, socket, action)
        case 'WS/SEND_SHOP_OFFER':
          return sendShopOffer(io, socket, action)
        // case 'WS/SEND_PRODUCT_OFFER':
        //   return sendProductOffer(io, socket, action)
        case 'WS/ACCEPT_OFFER':
          return acceptOffer(io, socket, action)
        case 'WS/REJECT_OFFER':
          return rejectOffer(io, socket, action)
        case 'WS/JOIN_THREAD':
          return joinChatThread(io, socket, action)
        case 'WS/LEAVE_THREAD':
          return leaveChatThread(io, socket, action)
        case 'WS/SOCKET_DISCONNECT':
          return socketDisconnect(io, socket, action)
      }
  })
  .catch(error => console.error(error))
}
