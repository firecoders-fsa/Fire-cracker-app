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
  //var send = require('../index.js')({
  user: 'graceshopperfirecoders@gmail.com',
  // user: credentials.user,                  // Your GMail account used to send emails
  pass: process.env.EMAIL_PASS,
  // pass: credentials.pass,                  // Application-specific password
  to: 'maxgrosshandler@gmail.com',
  subject: 'test subject',
  text: 'gmail-send example 1' // Plain text
  //html:    '<b>html text</b>'            // HTML
})

// Override any default option and send email

console.log('* [example 1.1] sending test email')

router.put('/checkout', async (req, res, next) => {
  try {
    send(
      {
        // Overriding default parameters
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
    req.cart.update(req.body)

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
    send(req.user.email)
    res.json({status})
  } catch (err) {
    next(err)
  }
})
