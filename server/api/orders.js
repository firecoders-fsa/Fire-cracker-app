const router = require('express').Router()

const {Order, Product, ProductOrderStash, User} = require('../db/models')
module.exports = router

GET /things
GET /things/:thingId
GET /things/:thingId/subCollection

GET /subCollection/:subCollectionId

POST /things
POST /things/:thingId/subCollection

PUT /things/:thingId

DELETE /things/:thingId
DELETE /things/:thingId/subCollection/:subCollectionId



GET /orders/1/1

DELETE /orders/1/1
POST /orders/1/1



// REVIEW:
// URL design:
// GET /orders/:userId
// GET /users/:userId/orders
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// REVIEW url design: :userId isn't even used here
// GET /orders/:id
// GET /orders/:userId/:orderId
//
router.get('/:userId/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id)

    let orderPrdoucts = await singleOrder.getProducts()

    res.json(orderPrdoucts)
  } catch (err) {
    next(err)
  }
})
//add items by associating a product w/ an order
// REVIEW:
// POST /user/10/orders
// orrr...
// POST /orders  with { userId: 3 } in body
router.post('/:userId', async (req, res, next) => {
  req.query
  try {
    // REVIEW: security/injection DANGER ZONE
    const newOrder = await Order.create(req.body)
    const currentUser = await User.findByPk(req.params.userId)
    await currentUser.addOrder(newOrder)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

GET /products?designerId=10

get /designers/10/products

// REVIEW: resources
// POST /productOrderStashes
// POST /orders/:userId/:productId
//
// POST /orders/:orderId/orderStashes

router.post('/:userId/:pid', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })

    const singleOrder = orderArr[0]

    const singleProduct = await Product.findByPk(req.params.pid)
    if (await singleOrder.hasProduct(singleProduct)) {
      let test = await ProductOrderStash.findAll({
        where: {
          productId: req.params.pid,
          orderId: singleOrder.id
        }
      })
      test[0].update({
        quantity: test[0].quantity + 1
      })
    }
    await singleOrder.addProduct(singleProduct)
    res.json(await singleOrder.getProducts())
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/:pid', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })
    const singleOrder = orderArr[0]

    const singleProduct = await Product.findByPk(req.params.pid)
    await singleOrder.removeProduct(singleProduct)

    res.json(await singleOrder.getProducts())
  } catch (err) {
    next(err)
  }
})

GET => read
DELETE => delete

PUT  => replace
PUT /orders/10 {buyer: 'collin'}

PATCH

GET /orders/10 => {buyer: 'collin'}

POST /orders
Location: /orders/10

GET /orders/10

// REVIEW: PUT /orders/10/45
router.put('/:userId/:pid/:num', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'created'
      }
    })
    const singleOrder = orderArr[0]
    const singleProduct = await Product.findByPk(req.params.pid)
    if (await singleOrder.hasProduct(singleProduct)) {
      let test = await ProductOrderStash.findAll({
        where: {
          productId: req.params.pid,
          orderId: req.params.id
        }
      })
      test[0].update({
        quantity: Number(req.params.num)
      })
    }
    await singleOrder.addProduct(singleProduct)
    res.json(await singleOrder.getProducts())
  } catch (err) {
    next(err)
  }
})
// REVIEW: REST principles vs RPC
// HTTP PUT /orders/10/checkout
/
// PATCH /orders/10 { status: 'processing' }
router.put('/:userId/:id/checkout', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id)
    if (singleOrder.status === 'completed' && req.body.status === 'processing') {
    }
    singleOrder.update({
      status: 'processing'
    })
    res.json('hey good job')
  } catch (err) {
    next(err)
  }
})
