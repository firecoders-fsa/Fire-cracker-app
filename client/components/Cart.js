import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendCart, removeProduct, changeQuantity} from '../store/orders'
import {fetchProduct} from '../store/singleProduct'
import Checkout from './Checkout'
import {ChangeQuantity} from './ChangeQuantity'

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
    console.log('cart: ', this.props)

    return this.props.cart.products && this.props.cart.products[0] ? (
      <div>
        {this.props.cart.products.map(product => (
          <div key={product.id}>
            <Link
              to={`/products/${product.id}`}
              onClick={() => this.props.fetchProduct(product.id)}
            >
              <h4>{product.name}</h4>
              <img src={product.images.map(img => img.imageURL)} />
            </Link>
            <h5>${product.price / 100}</h5>

            <ChangeQuantity
              singleProduct={product}
              cart={this.props.cart}
              sendQuantity={this.props.sendQuantity}
            />

            <p>{product.description}</p>
            <button
              type="button"
              onClick={() => this.deleteProduct(this.props.cart.id, product.id)}
            >
              Remove from Cart
            </button>
          </div>
        ))}
        <div>
          <Link to="/checkout" component={Checkout}>
            Checkout
          </Link>
        </div>
      </div>
    ) : (
      <div>cart is empty</div>
    )
  }
}

const mapDispatch = dispatch => ({
  sendCart: () => dispatch(sendCart()),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  removeProduct: (orderId, productId) =>
    dispatch(removeProduct(orderId, productId)),
  sendQuantity: (orderId, productId, quantity) =>
    dispatch(changeQuantity(orderId, productId, quantity))
})

const mapState = state => ({
  cart: state.orders.cart,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Cart))
