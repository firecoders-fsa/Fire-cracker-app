import axios from 'axios'

export const FIND_PRODUCTS = 'FIND_PRODUCTS'

export const findProducts = productResults => ({
  type: FIND_PRODUCTS,
  productResults
})

export const fetchSearch = (searchTerm, searchOption) => async dispatch => {
  try {
    const {data: searchResults} = await axios.get(
      `/api/products/search?q=${searchTerm}&searchOption=${searchOption}`
    )
    dispatch(findProducts(searchResults))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {
  searchProducts: []
}

const searchProducts = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS:
      return {
        ...state,
        searchProducts: action.productResults
      }
    default:
      return state
  }
}

export default searchProducts
