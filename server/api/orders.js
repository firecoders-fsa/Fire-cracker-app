const router = require('express').Router()

const {Order, Product, ProductOrderStash, Image} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({include: [{model: Product}]})

    res.json(allOrders)
  } catch (err) {
    console.error(err)
  }
})

//getting the products on a particular order
// /orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const singleOrder = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: [Product, {model: Product, include: Image}]
    })

    res.json(singleOrder)
  } catch (err) {
    next(err)
  }
})

//find an order according to the userId, add a specific product to the cart. if the product is already on the cart increment the quantity
// user/userId/product/productId
router.post('/:orderId/:productId', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.orderId,
        status: 'created'
      }
    })

    const singleOrder = orderArr[0]

    const singleProduct = await Product.findByPk(req.params.productId)
    if (await singleOrder.hasProduct(singleProduct)) {
      let test = await ProductOrderStash.findAll({
        where: {
          productId: req.params.productId,
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
router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.orderId,
        status: 'created'
      }
    })
    const singleOrder = orderArr[0]

    const singleProduct = await Product.findByPk(req.params.productId)
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
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const orderArr = await Order.findOrCreate({
      where: {
        id: req.params.orderId,
        status: 'created'
      }
    })
    const singleOrder = orderArr[0]
    const singleProduct = await Product.findByPk(req.params.productId)
    if (await singleOrder.hasProduct(singleProduct)) {
      let product = await ProductOrderStash.findAll({
        where: {
          productId: req.params.productId,
          orderId: req.params.orderId
        }
      })
      product[0].update({
        quantity: Number(req.query.quantity)
      })
    }
    await singleOrder.addProduct(singleProduct)
    res.json(await singleOrder.getProducts())
  } catch (err) {
    next(err)
  }
})
