const router = require('express').Router()
const {Product, Image} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{model: Image}]})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [{model: Image}]
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})
