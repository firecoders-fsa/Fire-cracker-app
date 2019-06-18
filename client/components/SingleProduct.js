import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
import {addProduct, sendCart, sendExistingCart} from '../store/orders'
import {UpdateProduct} from './Admin/UpdateProduct'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      hasNotUpdated: true
    }
    this.addToCart = this.addToCart.bind(this)
  }
  async componentDidMount() {
    await this.props.loadCart(this.props.user.id)
    await this.props.loadExsitingCart(this.props.user.id)
  }

  async componentDidUpdate() {
    if (this.state.hasNotUpdated) {
      this.setState({
        hasNotUpdated: false
      })
      await this.props.loadCart(this.props.user.id)
      await this.props.loadExsitingCart(this.props.user.id)

      // console.log('hello ', this.props)
    }
  }

  componentDidMount() {
    this.props.loadProduct(Number(this.props.match.params.id))
  }

  addToCart(orderId, productId) {
    event.preventDefault()
    // console.log('user: ', this.props)
    this.props.loadAddProduct(orderId, productId)
  }

  render() {
    console.log('singleproduct props: ', this.props.user.id)
    if (Object.keys(this.props.singleProduct).length) {
      const singleProduct = this.props.singleProduct
      // console.log(singleProduct)
      return (
        <div>
          <div key={singleProduct.id}>
            <h4>{singleProduct.name}</h4>
            <img src={singleProduct.images.map(img => img.imageURL)} />
            <h5>Price: ${singleProduct.price / 100}</h5>
            <button
              type="button"
              onClick={() =>
                this.addToCart(this.props.cart.id, this.props.singleProduct.id)
              }
            >
              Add to Cart
            </button>
            <h4>Description:</h4>
            <code>{singleProduct.description}</code>
            <h4>Manufacturer:</h4>
            <code>
              <p>{singleProduct.manufacturer}</p>
            </code>
            <h4>Reviews:</h4>
            <div>
              {singleProduct.reviews.map(review => (
                <div key={review.id}>
                  <code>
                    <p>{review.message}</p>
                    <p>Rating: {review.rating}</p>
                  </code>
                </div>
              ))}
            </div>
            {this.props.isAdmin ? (
              <Link to="/Update" component={UpdateProduct}>
                Update
              </Link>
            ) : (
              <Fragment />
            )}
            <p />
          </div>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct,
  user: state.user,
  cart: state.orders.cart,
  isAdmin: state.user.isAdmin
})

const mapDispatch = dispatch => ({
  loadProduct: productId => dispatch(fetchProduct(productId)),
  loadAddProduct: (orderId, productId) =>
    dispatch(addProduct(orderId, productId)),
  loadCart: userId => dispatch(sendCart(userId)),
  loadExsitingCart: userId => dispatch(sendExistingCart(userId))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
