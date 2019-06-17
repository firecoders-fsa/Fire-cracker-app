import React, {useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {markupProduct} from '../store/products'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}))

export function UpdateProduct(props) {
  const classes = useStyles()
  const singleProduct = props.singleProduct

  const [values, setValues] = useState({
    name: singleProduct.name,
    description: singleProduct.description,
    price: singleProduct.price,
    inventoryQuantity: singleProduct.inventoryQuantity,
    purchasedQuantity: singleProduct.purchasedQuantity,
    manufacturer: singleProduct.manufacturer
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault()
  }

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="input-form">
        <TextField
          id="outlined-Name"
          label="Product Name"
          type="text"
          placeholder="Product Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-Description"
          type="text"
          label="Description"
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-Price"
          type="number"
          label="Price"
          className={classes.textField}
          value={values.price}
          onChange={handleChange('price')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-inventoryQuantity"
          type="number"
          label="Inventory Quantity"
          className={classes.textField}
          value={values.inventoryQuantity}
          onChange={handleChange('inventoryQuantity')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-purchasedQuantity"
          type="number"
          label="Purchased Quantity"
          className={classes.textField}
          value={values.purchasedQuantity}
          onChange={handleChange('purchasedQuantity')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-manufacturer"
          type="text"
          label="Manufacturer"
          className={classes.textField}
          value={values.manufacturer}
          onChange={handleChange('manufacturer')}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            props.updateProduct(singleProduct.id, values)
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

const mapState = state => ({
  singleProduct: state.singleProduct
})

const mapDispatch = dispatch => ({
  updateProduct: (id, values) => dispatch(markupProduct(id, values))
})

export default withRouter(connect(mapState, mapDispatch)(UpdateProduct))
