const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Review = require('./review')
const Order = require('./order')
const Image = require('./image')
const ProductOrderStash = require('./productOrderStash')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Product.belongsToMany(Category, {through: 'product_category'})
Category.belongsToMany(Product, {through: 'product_category'})
Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Image)
Image.belongsTo(Product)

Order.belongsToMany(Product, {through: ProductOrderStash})
Product.belongsToMany(Order, {through: ProductOrderStash})

//hook that decides the price to store

module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  Image
}
