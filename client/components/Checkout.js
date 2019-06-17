import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store/orders'
import axios from 'axios'

export class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      hasNotUpdated: true
    }
    this.sendEmail = this.sendEmail.bind(this)
  }
  async componentDidUpdate() {
    if (this.state.hasNotUpdated) {
      this.setState({
        hasNotUpdated: false
      })
      await this.props.fetchCart(this.props.user.id)

      console.log('hello ', this.props.singleOrder[0])
    }
  }
  async sendEmail() {
    await axios.post('/api/users/30/checkout/done')
  }
  render() {
    console.log('user props: ', this.props.user)

    if (this.props.user.id) {
      if (this.props.singleOrder[0]) {
        return (
          <div>
            {this.props.user.shippingAddress
              ? this.props.user.shippingAddress
              : 'Example Shipping Address'}
            <br />
            <p>
              Does this shipping address look correct? If so, click the button
              below to finalize your order.
            </p>

            <br />
            <button type="button" onClick={this.sendEmail}>
              Click!
            </button>
          </div>
        )
      } else {
        return <div>cart is empty</div>
      }
    } else {
      return <div>user is not defined</div>
    }
  }
}

const mapDispatch = dispatch => ({
  fetchCart: id => dispatch(fetchCart(id))
})

const mapState = state => ({
  singleOrder: state.orders.singleOrder,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Checkout))
