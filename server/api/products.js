const router = require('express').Router()
const {Product, Image, Review, Category} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{model: Image}]})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const key = req.query.searchOption

    const searchResults = await Product.findAll({
      where: {
        [key]: {
          [Op.iLike]: '%' + req.query.q + '%'
        }
      },
      include: [{model: Image}, {model: Review}, {model: Category}]
    })

    res.json(searchResults)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [{model: Image}, {model: Review}]
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Product.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.id)
    console.log(req.body)
    updatedProduct.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      manufacturer: req.body.manufacturer,
      inventoryQuantity: req.body.inventoryQuantity,
      purchasedQuantity: req.body.purchasedQuantity
    })
    res.json(updatedProduct)
  } catch (err) {
    console.error(error)
    next(err)
  }
})
