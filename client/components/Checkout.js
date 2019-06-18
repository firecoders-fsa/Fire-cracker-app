import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendCart, completeCart} from '../store/orders'
import {Elements} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {fetchProduct} from '../store/singleProduct'

export class Checkout extends Component {
  render() {
    try {
      if (this.props.cart.products) {
        return (
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
                <p>Quantity: {product.productOrderStash.quantity}</p>
                <p>{product.description}</p>
              </div>
            ))}
            If your order looks right, click the button below!
            <br />
            <button type="button" onClick={() => this.props.completeCart()}>
              Checkout
            </button>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        )
      } else {
        return <div>cart is empty</div>
      }
    } catch (err) {
      return <div>{err}</div>
    }
  }
}

const mapDispatch = dispatch => ({
  sendCart: orderId => dispatch(sendCart(orderId)),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  completeCart: () => dispatch(completeCart())
})

const mapState = state => ({
  cart: state.orders.cart,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Checkout))
