module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('thread', {
    title: DataTypes.STRING,
    uid: DataTypes.STRING,
  })

  Thread.associate = ({ User, Message }) => {
    Thread.belongsTo(User)
    Thread.hasMany(Message)
  }

  return Thread

}
