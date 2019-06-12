const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  cartTotal: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart
