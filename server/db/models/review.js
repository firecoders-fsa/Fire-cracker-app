const db = require('../db')

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
