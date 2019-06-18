import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import orders from './orders'
import singleProduct from './singleProduct'
import searchProducts from './searchProducts'
import adminOrders from './adminOrders'

const reducer = combineReducers({
  user,
  products,
  singleProduct,
  orders,
  searchProducts,
  adminOrders
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
