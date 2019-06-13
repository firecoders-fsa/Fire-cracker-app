const router = require('express').Router()

const {Order, Product, ProductOrderStash, User} = require('../db/models')
module.exports = router

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
