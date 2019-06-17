import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
import {UpdateProduct} from './UpdateProduct'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadProduct(Number(this.props.match.params.id))
  }

  render() {
    if (Object.keys(this.props.singleProduct).length) {
      const singleProduct = this.props.singleProduct

      console.log(singleProduct)
      return (
        <div>
          <div key={singleProduct.id}>
            <h4>{singleProduct.name}</h4>
            <img src={singleProduct.images.map(img => img.imageURL)} />
            <h5>${singleProduct.price / 100}</h5>
            <p>{singleProduct.description}</p>
            <p>{singleProduct.manufacturer}</p>
            <div>
              {singleProduct.reviews.map(review => (
                <div key={review.id}>
                  <p>{review.message}</p>
                  <p>{review.rating}</p>
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
  isAdmin: state.user.isAdmin
})

const mapDispatch = dispatch => ({
  loadProduct: id => dispatch(fetchProduct(id))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
