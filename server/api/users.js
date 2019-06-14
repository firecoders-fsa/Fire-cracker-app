const router = require('express').Router()
const {User, Order} = require('../db/models')
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
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    const currentUser = await User.findByPk(req.params.userId)
    await currentUser.addOrder(newOrder)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

// checks out a cart by updating their order from 'created' to processing'
//TODO: Add functionality to 'freeze' priceAtPurchase
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
