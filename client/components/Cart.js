import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/orders'

export class Cart extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.fetchOrder(this.props.user.id)
  }

  render() {
    if (this.props.user.id) {
      return (
        <div>
          <h1>This is the cart</h1>
          <h2>{this.props.singleOrder[0]}</h2>
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
