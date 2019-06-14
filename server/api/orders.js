const router = require('express').Router()

const {Order, Product, ProductOrderStash, User} = require('../db/models')
module.exports = router

// getting all orders by a particular user
// /users/:userId
router.get('/:userId', async (req, res, next) => {
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

//getting the products on a particular order
// /orders/:orderId
router.get('/:userId/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id)

    let orderProducts = await singleOrder.getProducts()

    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})

//add items by associating a product w/ an order
// /users/:userId
router.post('/:userId', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    const currentUser = await User.findByPk(req.params.userId)
    await currentUser.addOrder(newOrder)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

//find an order according to the userId, add a specific product to the cart. if the product is already on the cart increment the quantity

// user/userId/product/productId
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

// delete product on an order for authorized user
// user/userId/product/productId
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

// finding/creating an order by its userId, describing new order as 'created', finding a specific product, and updating the quantity to a specific number

//can we split off this find/create functionality, does it need to be on the quantity adjustment route --|
//                                            |
// user/:userId/product/:productId/:quantity  |
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

// checks out a cart by updating their order from 'created' to processing'
//TODO: Add functionality to 'freeze' priceAtPurchase
// order/:orderId
router.put('/:userId/:id/checkout', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id)
    singleOrder.update({
      status: 'processing'
    })
    res.json('hey good job')
  } catch (err) {
    next(err)
  }
})
