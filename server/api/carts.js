const router = require('express').Router()
const {Order, Product, Cart, User} = require('../db/models')
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
    const cartArr = await Cart.findOrCreate({
      where: {
        id: req.params.id
      }
    })
    let userCart = cartArr[0]
    res.json(userCart)
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
    const userOrders = await Order.findAll({
      where: {
        userId: null
      }
    })

    const singleOrder = userOrders[0]

    const singleProduct = await Product.findByPk(req.params.pid)

    if (await singleOrder.hasProduct(singleProduct)) {
      singleProduct.update({
        purchasedQuantity: singleProduct.purchasedQuantity + 1
      })
    }
    console.log(singleProduct.purchasedQuantity)
    await singleOrder.addProduct(singleProduct)
    console.log(await singleOrder.getProducts())
    res.json(await singleOrder.getProducts())
  } catch (err) {
    next(err)
  }
})
