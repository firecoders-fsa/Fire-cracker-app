import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/adminOrders'
import Moment from 'react-moment'
import {getSingleOrder} from '../../store/orders'

export class AllOrders extends Component {
  componentDidMount() {
    console.log('componentdidmount')
    this.props.getOrders()
  }

  render() {
    const allOrders = this.props.allOrders
    console.log('allOrders: ', this.props)

    return (
      <div>
        {allOrders.map(order => (
          <div key={order.id}>
            <Link
              to={`/orderHistory/${order.id}`}
              onClick={() => props.loadSingleOrder()}
            >
              <div>
                <div className="card-top">
                  <h5>Order Number{order.id}</h5>
                  <Moment format="MM/DD/YYYY HH:mm">{order.createdAt}</Moment>
                </div>
                {order.products.map(product => {
                  return (
                    <div key={product.id} className="product-Row">
                      {product.images.length ? (
                        <img src={product.images[0].imageURL} />
                      ) : (
                        <p>No Images</p>
                      )}
                      <p>{product.purchasedQuantity}</p>
                      <p>${product.productOrderStash.priceAtPurchase / 100}</p>
                    </div>
                  )
                })}
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  allOrders: state.adminOrders.allOrders
})

const mapDispatch = dispatch => ({
  getOrders: () => dispatch(fetchOrders()),
  loadSingleOrder: orderId => dispatch(getSingleOrder(orderId))
})

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
