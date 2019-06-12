const router = require('express').Router()
const {Order, Product, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
    })
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
//so if someone puts a

//dynamic pricing exists in the shopping cart

//static pricing exists in the stash

router.post('/:id/:pid', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.id
      }
    })

    const singleOrder = orderArr[0]

    // const singleProduct = await Product.findByPk(req.params.pid)

    // await singleOrder.addProduct(singleProduct)

    const apple = await singleOrder.upsert({id: 1})

    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})
