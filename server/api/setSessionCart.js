const {Order, Product, Image} = require('../db/models')

const setSessionCart = async (req, res, next) => {
  try {
    if (req.user) {
      const currentCart = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'created'
        },
        include: [Product, {model: Product, include: Image}]
      })
      req.cart = currentCart[0]
    } else if (req.session.cartId) {
      req.cart = await Order.findOne({
        where: {
          id: req.session.cartId
        },
        include: [Product, {model: Product, include: Image}]
      })
    } else {
      const order = await Order.create()
      req.session.cartId = order.id
      req.cart = order
    }
    next()
  } catch (error) {
    console.log(error)
    next()
  }
}

module.exports = setSessionCart
