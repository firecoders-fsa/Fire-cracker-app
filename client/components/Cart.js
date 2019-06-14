import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/orders'
import axios from 'axios'

export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      hasNotUpdated: true,
      productsInCart: {}
    }
  }

  async componentDidUpdate() {
    if (this.state.hasNotUpdated) {
      this.setState({
        hasNotUpdated: false
      })
      await this.props.fetchOrder(this.props.user.id)
      let productList = await axios.get(
        `/api/orders/${this.props.user.id}/${this.props.singleOrder[0].id}`
      )
      this.setState({
        productsInCart: productList
      })
      console.log('hello ', this.props.singleOrder[1])
      console.log('goodbye ', this.state.productsInCart)
      console.log('type of productsInCart ', typeof this.state.productsInCart)
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
  fetchOrder: id => dispatch(fetchOrder(id))
})

const mapState = state => ({
  singleOrder: state.orders.singleOrder,
  user: state.user
})

export default withRouter(connect(mapState, mapDispatch)(Cart))
