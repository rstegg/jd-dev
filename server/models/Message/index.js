module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    contentType: DataTypes.STRING,
    attachmentThumbUrl: DataTypes.STRING,
    attachmentUrl: DataTypes.STRING,
    guid: DataTypes.STRING,
    text: DataTypes.STRING
  })

  Message.associate = ({ User, Thread }) => {
    Message.belongsTo(User)
    Message.belongsTo(Thread)
  }

  return Message
}
