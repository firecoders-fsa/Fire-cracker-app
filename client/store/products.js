import axios from 'axios'

export const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = allProducts => ({
  type: SET_PRODUCTS,
  allProducts
})

export const fetchProducts = () => async dispatch => {
  try {
    const {data: allProducts} = await axios.get('/api/products')
    dispatch(setProducts(allProducts))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  allProducts: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        allProducts: action.allProducts
      }

    default:
      return state
  }
}

export default reducer
