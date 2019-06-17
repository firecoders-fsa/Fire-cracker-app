const router = require('express').Router()
const {User, Order, Product, Image} = require('../db/models')
module.exports = router
const nodemailer = require('nodemailer')

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
      },
      include: [Product, {model: Product, include: Image}]
    }).map(order => {
      order.products = order.getProducts()
      return order
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
router.post('/:userId/checkout/done', async (req, res, next) => {
  try {
    main().catch(console.error)
  } catch (err) {
    next(err)
  }
})

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'maxgrosshandler@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

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
