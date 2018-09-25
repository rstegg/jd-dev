const { User, Order } = requireDb

const shortId = require('shortid')
const moment = require('moment')

const sequelize = require('sequelize')

const { merge, pick } = require('ramda')
const updateOrderParams = [ 'designers' ]
const orderParams = [ 'uid', 'designers', 'name', 'units', 'type', 'contact', 'occlusion', 'pontic', 'linerSpacer', 'status', 'dueDate', 'dueTime', 'scanFileUrls', 'designFileUrls', 'createdAt' ]

module.exports = io => (req, res) => {
  User.findAll({
    where: { userType: 'designer' }
  })
  .then(designers => {
    if (designers && designers.length) {
      const assignedDesigner = designers.reduce((a, b) => {
          return a.priority > b.priority ? a : b;
      });
      return User.update({ priority: sequelize.literal('priority + 1') }, { where: { userType: 'designer' }})
        .then(users => {
          if (users) {
            console.log('designers exist');
            User.update({ priority: 0 }, { where: { id: assignedDesigner.id }, returning: true, plain: true })
            .then(([_, newDesigner]) => {
              const oldDesigners = order.designers ? order.designers : []

              const formattedNewDesigner = {
                id: newDesigner.id,
                email: newDesigner.email,
                priority: newDesigner.priority,
                image: newDesigner.image,
                name: newDesigner.name,
                job: 'full',
                asignedDate: moment()
              }

              const updatedDesigners = oldDesigners.concat(formattedNewDesigner)
              const updatedOrder = { designers: updatedDesigners, designerId: newDesigner.uid }
              Order.update(updatedOrder, { where: { userId: req.user.id, uid: order.uid }, returning: true, plain: true })
                .then(([_, savedOrder]) => {
                  io.to(newDesigner.uid).emit('action', {
                    type: 'NEW_ORDER_ASSIGNED',
                    payload: { order: savedOrder }
                  })
                  console.log('ASSIGNED NEW', savedOrder);
                })
                .catch(error => console.log('ERROR ASSIGNING NEW', error))
            })
          }
        })
      }
    })
}
