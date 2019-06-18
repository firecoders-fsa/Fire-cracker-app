const router = require('express').Router()
module.exports = router
const {Order, User} = require('../db/models')
const stripe = require('stripe')('sk_test_JZyKRRkdJ0YHWeFJx2GZzAuR')

router.get('/', (req, res, next) => {
  try {
    res.send(req.cart)
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    req.cart.update(req.body)
    res.json(req.cart)
  } catch (err) {
    next(err)
  }
})
router.post('/charge', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    next(err)
  }
})

router.put('/checkout/done', async (req, res, next) => {
  try {
    req.cart.update({
      status: 'completed'
    })
    res.json('this thing shipped')
  } catch (err) {
    next(err)
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
