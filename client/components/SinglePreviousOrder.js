import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleOrder} from '../store/orders'

import {fetchProduct} from '../store/singleProduct'
import Moment from 'react-moment'

export class SinglePreviousOrder extends Component {
  componentDidMount() {
    this.props.loadSingleOrder(Number(this.props.match.params.id))
  }

  render() {
    return this.props.singlePreviousOrder.products ? (
      <div>
        <h1>Order Number {this.props.singlePreviousOrder.id}</h1>
        <Moment format="MM/DD/YYYY HH:mm">
          {this.props.singlePreviousOrder.createdAt}
        </Moment>
        <h3>{this.props.singlePreviousOrder.status}</h3>
        {this.props.singlePreviousOrder.products.map(product => (
          <div key={product.id}>
            <Link
              to={`/products/${product.id}`}
              onClick={() => this.props.fetchProduct(product.id)}
            >
              <h5>{product.name}</h5>
              <img src={product.images[0].imageURL} />
              <h6>Quantity: {product.productOrderStash.quantity}</h6>
              <h6>${product.price / 100}</h6>
            </Link>
          </div>
        ))}
        <h3>
          Cart Total: ${this.props.singlePreviousOrder.products.reduce(
            (total, product) => total + product.price,
            0
          ) / 100}
        </h3>
      </div>
    ) : (
      <div>Error loading</div>
    )
  }
}

const mapDispatch = dispatch => ({
  loadSingleOrder: orderId => dispatch(getSingleOrder(orderId)),
  fetchProduct: id => dispatch(fetchProduct(id))
})

const mapState = state => ({
  user: state.user,
  singlePreviousOrder: state.orders.singlePreviousOrder
})

export default withRouter(connect(mapState, mapDispatch)(SinglePreviousOrder))
