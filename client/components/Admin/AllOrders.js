import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/adminOrders'
import Moment from 'react-moment'

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
            <div>
              <div className="card-top">
                <h5>{order.id}</h5>
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
                    <p>${product.price / 100}</p>
                  </div>
                )
              })}
            </div>
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
  getOrders: () => dispatch(fetchOrders())
})

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
