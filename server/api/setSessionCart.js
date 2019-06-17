const {Order, Product, Image} = require('../db/models')

const setSessionCart = async (req, res, next) => {
  try {
    if (req.user) {
      req.cart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'created'
        },
        include: [Product, {model: Product, include: Image}]
      })
    } else if (req.session.cartId) {
      req.cart = await Order.getById(req.session.cartId)
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
