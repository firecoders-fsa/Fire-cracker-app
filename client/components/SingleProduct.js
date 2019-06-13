import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadProduct(Number(this.props.match.params.id))
  }
  render() {
    console.log('this is props', this.props)
    console.log('this is state', this.state)
    if (Object.keys(this.props.singleProduct).length) {
      const singleProduct = this.props.singleProduct
      // console.log(singleProduct)
      return (
        <div>
          <div key={singleProduct.id}>
            <h4>{singleProduct.name}</h4>
            <img src={singleProduct.images.map(img => img.imageURL)} />
            <h5>${singleProduct.price / 100}</h5>
          </div>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  loadProduct: id => dispatch(fetchProduct(id))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
