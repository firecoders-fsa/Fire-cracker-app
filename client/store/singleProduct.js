import axios from 'axios'

export const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

export const singleProductView = singleProd => ({
  type: SINGLE_PRODUCT,
  singleProd
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

export const fetchProduct = id => async dispatch => {
  try {
    const {data: singleProduct} = await axios.get(`/api/products/${id}`)
    dispatch(singleProductView(singleProduct))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}
const singleProduct = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.singleProd
    case UPDATE_PRODUCT:
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        price: action.payload.price,
        inventoryQuantity: action.payload.inventoryQuantity,
        purchasedQuantity: action.payload.purchasedQuantity,
        manufacturer: action.payload.manufacturer
      }
    default:
      return state
  }
}

export default singleProduct
