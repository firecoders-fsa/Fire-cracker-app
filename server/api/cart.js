const router = require('express').Router()
router.get("/", async (req, res, next) => {
  res.send(req.cart)
})
