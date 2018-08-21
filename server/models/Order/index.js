module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    designers: DataTypes.JSONB,
    name: DataTypes.STRING,
    units: DataTypes.ARRAY(DataTypes.STRING),
    unitsCount: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    caseFileUrls: DataTypes.ARRAY(DataTypes.STRING),
    designFileUrls: DataTypes.ARRAY(DataTypes.STRING),
  })

  Order.associate = ({ User }) => {
    Order.belongsTo(User)
  }

  return Order

}
