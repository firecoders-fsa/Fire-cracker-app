import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendCart, removeProduct} from '../store/orders'
import {fetchProduct} from '../store/singleProduct'

export class Cart extends Component {
  constructor() {
    super()
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  async componentDidMount() {
    await this.props.sendCart()
  }

  deleteProduct(orderId, productId) {
    event.preventDefault()
    this.props.removeProduct(orderId, productId)
  }

  render() {
    // console.log(this.props)
    if (this.props.cart.products) {
      if (this.props.cart.products.length > 0) {
        return this.props.cart.products.map(product => (
          <div key={product.id}>
            <Link
              to={`/products/${product.id}`}
              onClick={() => this.props.fetchProduct(product.id)}
            >
              <h4>{product.name}</h4>
              <img src={product.images.map(img => img.imageURL)} />
            </Link>
            <h5>${product.price / 100}</h5>
            <p>Quantity: {product.productOrderStash.quantity}</p>
            <p>{product.description}</p>

            <button
              type="button"
              onClick={() => this.deleteProduct(this.props.cart.id, product.id)}
            >
              Remove from Cart
            </button>
          </div>
        ))
      } else {
        return <div>cart is empty</div>
      }
    } else {
      return <div>cart is empty</div>
    }
  }
}

const mapDispatch = dispatch => ({
  sendCart: () => dispatch(sendCart()),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  removeProduct: (orderId, productId) =>
    dispatch(removeProduct(orderId, productId))
})

const mapState = state => ({
  cart: state.orders.cart,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Cart))
