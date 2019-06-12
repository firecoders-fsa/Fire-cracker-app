'use strict'

const db = require('../server/db')
const User = require('../server/db/models/user')
const faker = require('faker')
const Product = require('../server/db/models/product')
// const User = require('../server/db/models/user')
const Category = require('../server/db/models/category')
const Order = require('../server/db/models/order')
const Review = require('../server/db/models/review')
const Image = require('../server/db/models/image')

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < 50; i++) {
    //product
    let randomName = faker.name.findName()
    let description = faker.commerce.product()
    let price = faker.random.number()
    let inventoryQuantity = faker.random.number()
    let manufacturer = faker.commerce.productAdjective()

    let fakeProd = await Product.create({
      name: randomName,
      description,
      price,
      inventoryQuantity,
      manufacturer
    })

    let image = await Image.create({
      imageUrl: '/images/defaultImg.jpg'
    })

    let adjective = faker.hacker.adjective()
    let fakeCat = await Category.create({
      name: adjective
    })

    let fakeImage = await Image.create()

    await fakeProd.addCategory(fakeCat)
    await fakeProd.addImage(fakeImage)
    let order = ['created', 'processing', 'cancelled', 'completed', 'shipped']

    let num = Math.floor(Math.random() * 5)

    let fakeOrder = await Order.create({
      status: order[num]
    })

    await fakeProd.addCategory(fakeCat)
    // console.log(Object.keys(fakeOrder.__proto__))
    await fakeOrder.addProduct(fakeProd)
  }

  let randomName = faker.name.findName()
  let description = faker.commerce.product()
  let price = faker.random.number()
  let inventoryQuantity = faker.random.number()
  let purchasedQuantity = 1

  let manufacturer = faker.commerce.productAdjective()

  let fakeProd2 = await Product.create({
    name: randomName,
    description,
    price,
    inventoryQuantity,
    purchasedQuantity,
    manufacturer
  })

  // let cartProd = await Cart.addProduct(fakeProd2)

  let testOrder = await Order.findByPk(2)
  testOrder.addProduct(fakeProd2)

  for (let i = 0; i < 50; i++) {
    //users
    let email = faker.internet.email()
    let password = faker.internet.password()
    let salt = faker.internet.password()
    let googleId = faker.internet.password()
    let shippingAddress = faker.address.streetAddress()

    await User.create({
      email,
      password,
      salt,
      googleId,
      isAdmin: false,
      shippingAddress
    })
  }

  for (let i = 0; i < 50; i++) {
    //order
  }

  for (let i = 0; i < 50; i++) {
    //review
    let message = faker.lorem.paragraph()
    let rating = Math.floor(Math.random() * 5) + 1
    Review.create({
      message,
      rating
    })
  }

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
