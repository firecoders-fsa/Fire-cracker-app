import axios from 'axios'

export const SET_ORDERS = 'SET_ORDERS'

export const setOrders = allOrders => ({
  type: SET_ORDERS,
  allOrders
})

export const fetchOrders = () => async dispatch => {
  try {
    const allOrders = await axios.get(`/api/orders`)
    dispatch(setOrders(allOrders))
  } catch (err) {
    console.error(err)
  }
}

export const adminOrders = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.allOrders
    default:
      return state
  }
}

export default adminOrders
