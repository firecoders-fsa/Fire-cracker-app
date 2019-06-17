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
    // console.log('orders:', orders)
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
function send(useremail) {
  require('gmail-send')({
    user: 'graceshopperfirecoders@gmail.com', // Your GMail account used to send emails
    pass: process.env.EMAIL_PASS, // Application-specific password
    to: useremail || 'graceshopperfirecoders@gmail.com', // Send to yourself
    subject: 'Your order was completed!',
    text:
      'Thanks for shopping with Firecoders Incorporated! We hope you have an explosively fun time with your products!' // Plain text
  })({}) // Send email without any check
}
router.put('/:userId/checkout/done', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'processing'
      }
    })
    singleOrder.update({
      status: 'completed'
    })
    res.json('this thing shipped')
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })
    if (singleOrder) {
      singleOrder.update({
        status: 'processing'
      })
      const currentUser = await User.findByPk(req.params.userId)
      send(currentUser.email)
      console.log(req.session)
      res.json('hey good job')
    } else {
      res.json('no')
    }
  } catch (err) {
    next(err)
  }
})
