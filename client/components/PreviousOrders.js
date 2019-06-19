import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPreviousOrders, getSingleOrder} from '../store/orders'
import Moment from 'react-moment'

export class PreviousOrders extends Component {
  componentDidMount() {
    this.props.loadPreviousOrders(this.props.user.id)
  }

  render() {
    return (
      <div>
        {this.props.previousOrders.map(order => (
          <div key={order.id}>
            <Link
              to={`/orderHistory/${order.id}`}
              onClick={() => this.props.loadSingleOrder(order.id)}
            >
              <h1>Order Number {order.id}</h1>
            </Link>

            <Moment format="MM/DD/YYYY HH:mm">{order.createdAt}</Moment>
            <h3>{order.status}</h3>
            <h2>{order.orderTotal}</h2>
            {order.products.map(product => (
              <div key={product.id}>
                <h5>{product.name}</h5>
                <img src={product.images[0].imageURL} />
                <h6>${product.productOrderStash.priceAtPurchase / 100}</h6>
              </div>
            ))}
            <div>
              Cart Total: ${order.products.reduce(
                (total, product) =>
                  total + product.productOrderStash.priceAtPurchase,
                0
              ) / 100}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  loadPreviousOrders: userId => dispatch(getPreviousOrders(userId)),
  loadSingleOrder: orderId => dispatch(getSingleOrder(orderId))
})

const mapState = state => ({
  user: state.user,
  previousOrders: state.orders.previousOrders
})

export default withRouter(connect(mapState, mapDispatch)(PreviousOrders))
