import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

export class AllProducts extends Component {
  render() {
    const productsArray = this.props.products
    return this.props.products ? (
      <div>
        {productsArray.map(product => (
          <div key={product.id}>
            <Link
              to={`/products/${product.id}`}
              onClick={() => this.props.fetchProduct(product.id)}
            >
              <h4>{product.name}</h4>
              <div>
                {product.images.length && (
                  <img src={product.images[0].imageURL} />
                )}
              </div>
              <h5>${product.price / 100}</h5>
            </Link>
          </div>
        ))}
      </div>
    ) : (
      <div>Error Loading</div>
    )
  }
}

const mapState = state => ({
  products: state.products.allProducts
})

const mapDispatch = dispatch => ({
  fetchProduct: id => dispatch(fetchProduct(id))
})

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
