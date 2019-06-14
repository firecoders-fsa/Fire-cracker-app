import axios from 'axios'

export const SET_ORDER = 'SET_ORDER'
export const ADD_PROD_TO_ORDER = 'ADD_PROD_TO_ORDER'

export const setOrder = singleOrder => ({
  type: SET_ORDER,
  singleOrder
})

export const addProdToOrder = product => ({
  type: ADD_PROD_TO_ORDER,
  product
})

export const fetchCart = id => async dispatch => {
  try {
    const {data: singleOrder} = await axios.get(`/api/users/${id}/cart`)
    dispatch(setOrder(singleOrder))
  } catch (err) {
    console.error(err)
  }
}

export const addProduct = (product, user) => async dispatch => {
  try {
    const {data: updatedOrder} = await axios.post(
      `/api/orders/${user.id}/${product.id}`
    )
    dispatch(addProdToOrder(updatedOrder))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  singleOrder: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        singleOrder: action.singleOrder
      }

    default:
      return state
  }
}

export default reducer
