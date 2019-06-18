const router = require('express').Router()
module.exports = router
const stripe = require('stripe')('sk_test_JZyKRRkdJ0YHWeFJx2GZzAuR')

router.get('/', (req, res, next) => {
  try {
    res.send(req.cart)
  } catch (error) {
    next(error)
  }
})

var send = require('gmail-send')({
  user: 'graceshopperfirecoders@gmail.com',

  pass: process.env.EMAIL_PASS,

  to: 'graceshopperfirecoders@gmail.com',
  subject: 'Thank you for your order!',
  text: 'Thanks for shopping with Firecoders! Your order id is fake!'
})

router.put('/checkout', async (req, res, next) => {
  try {
    req.cart.update(req.body)
    console.log('this is the request', req)
    send(
      {
        to: req.body.email || req.user.email,
        text:
          'Thanks for shopping with Firecoders! Your order id is ' + req.cart.id
      },
      function(err, res) {
        console.log(
          '* [example 1.1] send() callback returned: err:',
          err,
          '; res:',
          res
        )
      }
    )
    res.json(req.cart)
  } catch (err) {
    next(err)
  }
})

function getTotal(req) {
  let total = 0
  for (let i = 0; i < req.cart.products.length; i++) {
    total += Number(req.cart.products[i].price)
  }
  return total
}
router.post('/charge', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create({
      amount: getTotal(req),
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({status})
  } catch (err) {
    next(err)
  }
})
