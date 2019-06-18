import axios from 'axios'

export const CREATE_OR_FIND_CART = 'CREATE_OR_FIND_CART'
export const ADD_PROD_TO_ORDER = 'ADD_PROD_TO_ORDER'
export const DELETE_PROD_FROM_CART = 'DELETE_PROD_FROM_CART'
export const CHANGE_PURCHASE_QUANTITY = 'CHANGE_PURCHASE_QUANTITY'
export const CHECKOUT_CART = 'CHECKOUT_CART'

export const changePurchaseQuantity = (productId, quantity) => ({
  type: CHANGE_PURCHASE_QUANTITY,
  productId,
  quantity
})

export const changeQuantity = (
  orderId,
  productId,
  quantity
) => async dispatch => {
  try {
    await axios.put(`/api/orders/${orderId}/${productId}?quantity=${quantity}`)
    dispatch(changePurchaseQuantity(productId, quantity))
  } catch (err) {
    console.error(err)
  }
}

export const deleteProduct = (orderId, productId) => ({
  type: DELETE_PROD_FROM_CART,
  orderId,
  productId
})

export const removeProduct = (orderId, productId) => async dispatch => {
  try {
    await axios.delete(`/api/orders/${orderId}/${productId}`)
    dispatch(deleteProduct(orderId, productId))
  } catch (err) {
    console.error(err)
  }
}

export const setCart = cart => ({
  type: CREATE_OR_FIND_CART,
  cart
})

export const addProdToOrder = updatedOrder => ({
  type: ADD_PROD_TO_ORDER,
  updatedOrder
})
export const checkoutCart = checkedOutCart => ({
  type: CHECKOUT_CART,
  checkedOutCart
})

export const sendCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/cart`)
    dispatch(setCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const completeCart = (email, address) => async dispatch => {
  console.log('inside of completeCart', email)
  try {
    const {data: checkedOutCart} = await axios.put('/api/cart/checkout', {
      email,
      address
    })
    dispatch(checkoutCart(checkedOutCart))
  } catch (err) {
    console.error(err)
  }
}
export const addProduct = (orderId, productId) => async dispatch => {
  try {
    const {data: updatedOrder} = await axios.post(
      `/api/orders/${orderId}/${productId}`
    )
    dispatch(addProdToOrder(updatedOrder))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  cart: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_OR_FIND_CART:
      return {
        ...state,
        cart: action.cart
      }
    case ADD_PROD_TO_ORDER:
      return {
        ...state,
        cart: action.updatedOrder
      }
    case DELETE_PROD_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.filter(
            product => product.id !== action.productId
          )
        }
      }
    case CHECKOUT_CART:
      return {
        ...state,
        cart: action.checkedOutCart
      }
    case CHANGE_PURCHASE_QUANTITY:
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.map(product => {
            if (product.id === action.productId) {
              product.productOrderStash.quantity = action.quantity
            }
            return product
          })
        }
      }
    default:
      return state
  }
}

export default reducer
