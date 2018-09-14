module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    contentType: DataTypes.STRING,
    attachmentThumbUrl: DataTypes.STRING,
    attachmentUrl: DataTypes.STRING,
    guid: DataTypes.STRING,
    text: DataTypes.STRING
  })

  Message.associate = ({ User, Order, Thread }) => {
    Message.belongsTo(User)
    Message.belongsTo(Thread)
    Message.belongsTo(Order)
  }

  return Message
}
