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
