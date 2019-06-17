import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendCart} from '../store/orders'
import axios from 'axios'

export class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      hasNotUpdated: true,
      hasNotCheckedOut: true
    }
    this.sendEmail = this.sendEmail.bind(this)
  }
  async componentDidMount() {
    let snake = await axios.put('/api/users/30/checkout')
    if (snake.data == 'no') {
      this.setState({
        hasNotCheckedOut: false
      })
    }
  }
  async componentDidUpdate() {
    if (this.state.hasNotUpdated) {
      this.setState({
        hasNotUpdated: false
      })
      await this.props.sendCart(this.props.user.id)
    }
  }
  async sendEmail() {
    await axios.put('/api/users/30/checkout')
    await axios.put('/api/users/30/checkout/done')
    this.setState({
      hasNotCheckedOut: false
    })
  }
  render() {
    try {
      if (this.state.hasNotCheckedOut) {
        return (
          <div>
            If your order looks right, click the button below!
            <button type="button" onClick={this.sendEmail}>
              Checkout
            </button>
          </div>
        )
      } else {
        return <div>Thanks for checking out!</div>
      }
    } catch (err) {
      return <div>{err}</div>
    }
  }
}

const mapDispatch = dispatch => ({
  sendCart: id => dispatch(sendCart(id))
})

const mapState = state => ({
  singleOrder: state.orders.singleOrder,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Checkout))
