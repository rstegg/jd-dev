const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permalink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verifyToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: DataTypes.STRING,
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'individual'
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      }
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    zip: DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: DataTypes.STRING,
    image: DataTypes.STRING,
    stripe_customer_id: DataTypes.STRING,
    stripe_account_id: DataTypes.STRING,
    card_accounts: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
    bank_accounts: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: []
    },
    send_method: DataTypes.STRING,
    receive_method: DataTypes.STRING,
    legal_entity: DataTypes.JSONB,
    verify_needed: DataTypes.JSONB
  })

  User.associate = ({ Thread, Order, Message }) => {
    User.hasMany(Thread)
    User.hasMany(Order)
    User.hasMany(Message)
  }

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
  }

  return User
}
