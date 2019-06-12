const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrderStash = db.define('productOrderStash', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrderStash
