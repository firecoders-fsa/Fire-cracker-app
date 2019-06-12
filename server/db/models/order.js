const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'cancelled', 'completed', 'shipped'],
    allowNull: false,
    defaultValue: 'created'
  }
})

module.exports = Order
