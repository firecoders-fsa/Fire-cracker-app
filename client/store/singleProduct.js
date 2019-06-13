import axios from 'axios'

export const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

export const singleProductView = singleProd => ({
  type: SINGLE_PRODUCT,
  singleProd
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
  console.log('this is the action!!!!!', action)
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.singleProd
    default:
      return state
  }
}

export default singleProduct
