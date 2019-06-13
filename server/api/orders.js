const router = require('express').Router()

const {Order, Product, ProductOrderStash} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id)

    let orderPrdoucts = await singleOrder.getProducts()

    res.json(orderPrdoucts)
  } catch (err) {
    next(err)
  }
})
//add items by associating a product w/ an order

router.post('/:id/:pid', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.id
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
        quantity: test[0].quantity + 1
      })
    }
    await singleOrder.addProduct(singleProduct)
    res.json(await singleOrder.getProducts())
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/:pid', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.id
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

router.put('/:id/:pid/:num', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.id
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
