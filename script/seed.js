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
  const fireWorkNames = [
    'Anaar (Flowerpots)',
    'Chakhri (Ground spinner)',
    'Rocket',
    'Ladis (Garland)',
    'Snakessss!',
    'Phuljhadi (Sparklers) or Pencil crackers',
    'Hunter',
    'Laxmi bomb',
    'aloo bomb',
    'gola bomb',
    'Phoonk bomb',
    'spleen splitters',
    'whisker biscuits',
    'honkey lighters',
    'hoosker doos',
    "hoosker don'ts",
    'cherry bombs',
    'nipsy daisers',
    "one single whistlin' kitty chaser"
  ]

  const fireworkImageUrls = [
    '/images/fountain.png',
    '/images/flowerPot.png',
    '/images/groundspinner.png',
    '/images/groundSpinner.jpg',
    '/images/rocketshell.png',
    '/images/rocket.jpg',
    '/images/cherryBomb.png'
  ]
  for (let i = 0; i < fireWorkNames.length; i++) {
    //product
    let randomName = fireWorkNames[i]
    let description = faker.lorem.sentences()
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

    if (i === 0) {
      let fireImage = await Image.create({
        imageURL: '/images/fountain.png'
      })
      await fakeProd.addImage(fireImage)
      // let fireImage2 = await Image.create({
      //   imageURL: '/images/flowerPot.png'
      // })
      // await fakeProd.addImage(fireImage2)
    } else if (i === 1) {
      let fireImage = await Image.create({
        imageURL: fireworkImageUrls[2]
      })
      await fakeProd.addImage(fireImage)
      // let fireImage2 = await Image.create({
      //   imageURL: fireworkImageUrls[3]
      // })
      // await fakeProd.addImage(fireImage2)
    } else if (i === 2) {
      let fireImage = await Image.create({
        imageURL: fireworkImageUrls[4]
      })
      await fakeProd.addImage(fireImage)
      // let fireImage2 = await Image.create({
      //   imageURL: fireworkImageUrls[5]
      // })
      // await fakeProd.addImage(fireImage2)
    } else if (i === 16) {
      let fireImage = await Image.create({
        imageURL: fireworkImageUrls[6]
      })
      await fakeProd.addImage(fireImage)
    } else {
      let fakeImage = await Image.create()
      await fakeProd.addImage(fakeImage)
    }

    let adjective = faker.hacker.adjective()
    let fakeCat = await Category.create({
      name: adjective
    })

    //review
    let message = faker.lorem.sentences()
    let rating = Math.floor(Math.random() * 5) + 1
    let fakeRev = await Review.create({
      message,
      rating
    })

    await fakeProd.addReview(fakeRev)

    await fakeProd.addCategory(fakeCat)
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

  for (let i = 0; i < 27; i++) {
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
