import axios from 'axios'

export const CREATE_OR_FIND_CART = 'CREATE_OR_FIND_CART'
export const ADD_PROD_TO_ORDER = 'ADD_PROD_TO_ORDER'
export const GET_CART = 'GET_CART'

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

export const sendExistingCart = userId => async dispatch => {
  try {
    const {data: cart} = await axios.get(`/api/users/${userId}/cart`)
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
    default:
      return state
  }
}

export default reducer
