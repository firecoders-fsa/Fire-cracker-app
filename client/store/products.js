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

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const updateProduct = (id, payload) => ({
  type: UPDATE_PRODUCT,
  payload: {
    id: id,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    manufacturer: payload.manufacturer,
    inventoryQuantity: payload.inventoryQuantity,
    purchasedQuantity: payload.purchasedQuantity
  }
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

export const markupProduct = (id, payload) => async dispatch => {
  try {
    await axios.put(`/api/products/${id}`, {
      name: payload.name,
      description: payload.description,
      price: payload.price,
      inventoryQuantity: payload.inventoryQuantity,
      purchasedQuantity: payload.purchasedQuantity,
      manufacturer: payload.manufacturer
    })
    dispatch(updateProduct(id, payload))
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
        allProducts: [...state.allProducts].filter(
          product => product.id !== action.id
        )
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts].map(product => {
          if (product.id === action.id) {
            return {
              ...state.product,
              name: action.payload.name,
              description: action.payload.description,
              price: action.payload.price,
              inventoryQuantity: action.payload.inventoryQuantity,
              purchasedQuantity: action.payload.purchasedQuantity,
              manufacturer: action.payload.manufacturer
            }
          }
          return product
        })
      }
    default:
      return state
  }
}

export default reducer
