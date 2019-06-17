import axios from 'axios'

export const CREATE_OR_FIND_CART = 'CREATE_OR_FIND_CART'
export const ADD_PROD_TO_ORDER = 'ADD_PROD_TO_ORDER'
export const GET_CART = 'GET_CART'
export const DELETE_PROD_FROM_CART = 'DELETE_PROD_FROM_CART'
export const CHANGE_PURCHASE_QUANTITY = 'CHANGE_PURCHASE_QUANTITY'

export const changePurchaseQuantity = quantity => ({
  type: CHANGE_PURCHASE_QUANTITY,
  quantity
})

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

export const findCart = cart => ({
  type: GET_CART,
  cart
})

export const setCart = cart => ({
  type: CREATE_OR_FIND_CART,
  cart
})

export const addProdToOrder = updatedOrder => ({
  type: ADD_PROD_TO_ORDER,
  updatedOrder
})

export const sendExistingCart = () => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/cart`)
    dispatch(findCart(cart))
  } catch (err) {
    console.error(err)
  }
}

export const sendCart = userId => async dispatch => {
  try {
    const {data: cart} = await axios.post(`/api/users/${userId}/cart`)
    dispatch(setCart(cart))
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
    case GET_CART:
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
    default:
      return state
  }
}

export default reducer
