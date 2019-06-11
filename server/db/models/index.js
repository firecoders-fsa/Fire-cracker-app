const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Review = require('./require')
const Order = require('./order')
const Image = require('./image')

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
Order.belongsToMany(Product, {through: 'product_order'})
Product.belongsToMany(Order, {through: 'product_order'})

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Image)
Image.belongsTo(Product)

module.exports = {
  User,
  Product,
  Category,
  Review,
  Order
}
