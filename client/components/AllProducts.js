import React, {Component} from 'react'
import {connect} from 'react-redux'

export class AllProducts extends Component {
  render() {
    const productsArray = this.props.products
    return (
      <div>
        {productsArray.map(product => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <img src={product.images.map(img => img.imageURL)} />
            <h5>${product.price / 100}</h5>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.allProducts
})

export default connect(mapState, null)(AllProducts)
