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
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    // type: Sequelize.ARRAY({type: Sequelize.STRING}),
    type: Sequelize.STRING,
    defaultValue: '/images/defaultImg.jpg'
  },

  manufacturer: {
    type: Sequelize.STRING
  }
})

module.exports = Product
