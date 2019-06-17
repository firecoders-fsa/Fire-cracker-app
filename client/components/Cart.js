import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendCart, sendExistingCart, removeProduct} from '../store/orders'
import {fetchProduct} from '../store/singleProduct'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      hasNotUpdated: true
    }
  }
  async componentDidMount() {
    await this.props.sendCart(this.props.user.id)
    await this.props.sendExistingCart(this.props.user.id)
  }

  // async componentDidUpdate() {
  //   if (this.state.hasNotUpdated) {
  //     this.setState({
  //       hasNotUpdated: false
  //     })
  //     await this.props.sendCart(this.props.user.id)
  //     await this.props.sendExistingCart(this.props.user.id)

  //   }
  // }

  deleteProduct(orderId, productId) {
    event.preventDefault()
    this.props.removeProduct(orderId, productId)
  }

  render() {
    // console.log('props: ', this.props)
    if (this.props.user.id) {
      if (this.props.cart.products) {
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
      return <div>user is not defined</div>
    }
  }
}

const mapDispatch = dispatch => ({
  sendCart: userId => dispatch(sendCart(userId)),
  sendExistingCart: userId => dispatch(sendExistingCart(userId)),
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  removeProduct: (orderId, productId) =>
    dispatch(removeProduct(orderId, productId))
})

const mapState = state => ({
  cart: state.orders.cart,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Cart))
