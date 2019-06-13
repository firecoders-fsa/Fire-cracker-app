const Sequelize = require('sequelize')
const db = require('../db')

// REVIEW: naming
const ProductOrderStash = db.define('productOrderStash', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = ProductOrderStash
