const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING.ENUM([
      'created',
      'processing',
      'cancelled',
      'completed',
      'shipped'
    ]),
    allowNull: false,
    defaultValue: 'created'
  }
  // products: {
  //   type: Sequelize.ARRAY.INTEGER,
  //   allowNull: false
  // },
})
