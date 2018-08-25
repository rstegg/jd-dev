module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    designers: DataTypes.JSONB,
    designerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    units: DataTypes.ARRAY(DataTypes.STRING),
    unitsCount: DataTypes.STRING,
    uid: {
      type: DataTypes.STRING,
      unique: true
    },
    type: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'sent'
    },
    dueDate: DataTypes.STRING,
    caseFileUrls: DataTypes.ARRAY(DataTypes.STRING),
    designFileUrls: DataTypes.ARRAY(DataTypes.STRING),
    contact: DataTypes.STRING,
    occlusion: DataTypes.STRING,
    library: DataTypes.STRING,
    pontic: DataTypes.STRING,
    linerSpacer: DataTypes.STRING
  })

  Order.associate = ({ User }) => {
    Order.belongsTo(User)
  }

  return Order

}
