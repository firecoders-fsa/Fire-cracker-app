const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // REVIEW: might be good to actually call this priceInCents
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // REVIEW: deleted at
  deletedAt: Sequelize.TIMESTAMP,
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    // REVIEW: can this be negative?
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  purchasedQuantity: {
    // REVIEW: nice double entry
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  manufacturer: {
    type: Sequelize.STRING
  }
})

module.exports = Product
