import React, {useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {createProduct} from '../../store/products'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'
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

function NewProduct(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '   ',
    description: '  ',
    price: '  ',
    inventoryQuantity: '  ',
    purchaseQuantity: '  ',
    manufacturer: '    '
  })
  console.log(values)
  const handleChange = name => event => {
    console.log('event on handlechange', event)
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
          id="outlined-purchaseQuantity"
          type="number"
          label="Purchase Quantity"
          className={classes.textField}
          value={values.purchaseQuantity}
          onChange={handleChange('purchaseQuantity')}
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
            props.submitProduct(values)
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

const mapDispatch = dispatch => ({
  submitProduct: product => dispatch(createProduct(product))
})

export default withRouter(connect(null, mapDispatch)(NewProduct))
