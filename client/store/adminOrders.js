import axios from 'axios'

export const SET_ORDERS = 'SET_ORDERS'

export const setOrders = allOrders => ({
  type: SET_ORDERS,
  allOrders
})

export const fetchOrders = () => async dispatch => {
  try {
    console.log('hitting thunk')
    const {data: allOrders} = await axios.get('/api/orders')
    console.log('allOrders', allOrders)
    dispatch(setOrders(allOrders))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  allOrders: []
}

export const adminOrders = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        allOrders: action.allOrders
      }
    default:
      return state
  }
}

export default adminOrders
