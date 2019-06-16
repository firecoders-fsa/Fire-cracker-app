import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendCart, sendExistingCart} from '../store/orders'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      hasNotUpdated: true
    }
  }

  async componentDidUpdate() {
    if (this.state.hasNotUpdated) {
      this.setState({
        hasNotUpdated: false
      })
      await this.props.sendCart(this.props.user.id)
      await this.props.sendExistingCart(this.props.user.id)

      // console.log('hello ', this.props.singleOrder)
    }
  }

  render() {
    // console.log('props: ', this.props)
    if (this.props.user.id) {
      if (this.props.cart.products) {
        return this.props.cart.products.map(product => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <img src={product.images.map(img => img.imageURL)} />
            <h5>${product.price / 100}</h5>
            <p>{product.description}</p>
            <p />
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
  sendExistingCart: userId => dispatch(sendExistingCart(userId))
})

const mapState = state => ({
  cart: state.orders.cart,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Cart))
