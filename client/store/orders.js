import axios from 'axios'

export const SET_ORDER = 'SET_ORDER'

export const setOrder = singleOrder => ({
  type: SET_ORDER,
  singleOrder
})

export const fetchOrder = () => async dispatch => {
  try {
    const {data: singleOrder} = await axios.get(`/api/orders/`)
    dispatch(setOrder(singleOrder))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  singleOrder: []
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
