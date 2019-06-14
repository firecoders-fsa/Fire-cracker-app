import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCart} from '../store/orders'
import axios from 'axios'

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
      await this.props.fetchCart(this.props.user.id)

      console.log('hello ', this.props.singleOrder[0])
    }
  }

  render() {
    if (this.props.user.id) {
      return (
        <div>
          <h1>This is the cart</h1>
        </div>
      )
    } else {
      return <h1>user is not defined</h1>
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

export default withRouter(connect(mapState, mapDispatch)(Cart))
