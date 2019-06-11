const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: '/images/defaultImg.jpg'
  }
})

module.exports = ModelName
