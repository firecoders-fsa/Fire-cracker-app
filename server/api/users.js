const router = require('express').Router()
const {User, Order, Product, Image} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:email', async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: {
        email: req.params.email
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'created'
      },
      include: [Product, {model: Product, include: Image}]
    })
    console.log('orders:', orders)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const [newOrder, i] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })
    const currentUser = await User.findByPk(req.params.userId)
    await currentUser.addOrder(newOrder)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

// checks out a cart by updating their order from 'created' to processing'
//Add functionality to 'freeze' priceAtPurchase
// order/:orderId
router.put('/:userId/checkout', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })
    singleOrder.update({
      status: 'processing'
    })
    res.json('hey good job')
  } catch (err) {
    next(err)
  }
})
