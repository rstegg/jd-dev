const models = requireDb
const { Message, User, Offer, Product } = models

const { merge, pick } = require('ramda')

const offerAttributes = ['id', 'state', 'productName', 'price', 'sellerId']
const userAttributes = ['id', 'username', 'image']

const validate = productId =>
  Product.findOne({
    include: [{
      model: User,
      attributes: ['id']
    }],
    where: { id: productId }
  })
  .then(product =>
    !product ? Promise.reject('Invalid product id')
    : product
  )

const sendShopOffer = (io, socket, action) => {
  const { user, productId, price, threadId } = action.payload
  const { username, image, token } = user
  const avatar = image

  validate(productId)
    .then(validatedProduct => {
      const newOffer = merge({
        userId: socket.userId,
        productId: validatedProduct.id,
        productName: validatedProduct.name,
        sellerId: validatedProduct.user.id,
        state: 'open'
      }, pick(offerAttributes, action.payload))
      return Offer.create(newOffer, { plain: true, })
    })
    .then(offer =>
      !offer ? Promise.reject('Offer not created')
      : offer
    )
    .then(validatedOffer => {
      const newMessage = {
        contentType: 'offer',
        offerId: validatedOffer.id,
        userId: socket.userId,
        threadId
      }
      return Message.create(newMessage, { plain: true })
    })
    .then(message =>
      !message ? Promise.reject('Message not created')
      : message
    )
    .then(validatedMessage => {
      Message.findOne({
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
        where: { id: validatedMessage.id }
      })
      .then(message =>
        io.to(threadId).emit('action', {
          type: 'RECEIVE_THREAD_CHAT_MESSAGE',
          payload: {
            message
          }
        })
      )
    })
    .catch(error => console.error(error)) //TODO: return custom error handling
}

const sendProductOffer = (socket, action) => {}

module.exports = { sendShopOffer, sendProductOffer }
