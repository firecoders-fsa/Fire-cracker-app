const db = require('../db')
const Sequelize = require('sequelize')

const Review = db.define('review', {
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Review
