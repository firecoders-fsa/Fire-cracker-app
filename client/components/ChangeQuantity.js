import React, {useState} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
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

export function ChangeQuantity(props) {
  const classes = useStyles()

  const [value, setValue] = useState(
    props.singleProduct.productOrderStash.quantity
  )

  const handleChange = () => event => {
    setValue(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
  }
  console.log(props)

  if (props.singleProduct.id) {
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="input-form">
          <TextField
            id="outlined-Quantity"
            type="number"
            label="Quantity"
            className={classes.textField}
            value={value}
            onChange={handleChange()}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              props.sendQuantity(props.cart.id, props.singleProduct.id, value)
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

const mapState = state => ({
  cart: state.orders.cart
})

export default withRouter(connect(mapState, null)(ChangeQuantity))
