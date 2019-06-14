import axios from 'axios'

export const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = allProducts => ({
  type: SET_PRODUCTS,
  allProducts
})

export const NEW_PRODUCT = 'NEW_PRODUCT'

export const newProduct = product => ({
  type: NEW_PRODUCT,
  product
})

export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id
})

export const fetchProducts = () => async dispatch => {
  try {
    const {data: allProducts} = await axios.get('/api/products')
    dispatch(setProducts(allProducts))
  } catch (err) {
    console.error(err)
  }
}

export const createProduct = product => async dispatch => {
  try {
    console.log(product)
    const {data: addedProduct} = await axios.post('/api/products', product)
    dispatch(newProduct(addedProduct))
  } catch (err) {
    console.error(err)
  }
}

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(deleteProduct(id))
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
    case NEW_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.product]
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        allProducts: state.allProducts.filter(
          product => product.id !== action.id
        )
      }
    default:
      return state
  }
}

export default reducer
