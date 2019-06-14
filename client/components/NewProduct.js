import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createProduct} from '../store/products'

class NewProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      inventoryQuantity: 0,
      purchaseQuantity: 0,
      manufacturer: ''
    }
    console.log(this.props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchProjects()
  // }

  handleSubmit(event) {
    event.preventDefault()
    //updates to state from select
  }

  handleChange(event) {
    event.preventDefault()
    if (event.target.name === 'name') {
      this.setState({name: event.target.value})
    } else if (event.target.name === 'description') {
      this.setState({description: event.target.value})
    } else if (event.target.name === 'price') {
      this.setState({price: Number(event.target.value)})
    } else if (event.target.name === 'inventoryQuantity') {
      this.setState({inventoryQuantity: Number(event.target.value)})
    } else if (event.target.name === 'purchaseQuantity') {
      this.setState({purchaseQuantity: Number(event.target.value)})
    } else if (event.target.name === 'manufacturer') {
      this.setState({manufacturer: event.target.value})
    }
  }

  render() {
    return (
      <form id="new Prdouct" onSubmit={this.handleSubmit}>
        <div className="input-form">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="number"
            name="price"
            placeholder="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="number"
            name="inventoryQuantity"
            placeholder="inventory Quantity"
            value={this.state.inventoryQuantity}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="number"
            name="purchaseQuantity"
            placeholder="purchased Quantity"
            value={this.state.purchaseQuantity}
            onChange={this.handleChange}
          />
          <input
            className="form-control"
            type="text"
            name="manufacturer"
            placeholder="manufacturer"
            value={this.state.manufacturer}
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="submit"
              onClick={() => {
                this.props.submitProduct(this.state)
              }}
            >
              Submit
            </button>
          </span>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitProduct: product => dispatch(createProduct(product))
})

export default withRouter(connect(null, mapDispatch)(NewProduct))
