const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  try {
    res.send(req.cart)
  } catch (error) {
    next(error)
  }
})
