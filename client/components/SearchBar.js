import React, {useState, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchSearch} from '../store/searchProducts'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import InputBase from '@material-ui/core/InputBase'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase)

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

export function SearchBar(props) {
  const classes = useStyles()

  const [values, setValues] = useState({
    searchTerm: '',
    searchOption: 'name'
  })

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

  console.log(values.searchTerm)

  return (
    <form>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-native-simple" />
        <NativeSelect
          value={values.searchOption}
          onChange={handleChange('searchOption')}
          input={<BootstrapInput name="" id="age-customized-native-simple" />}
        >
          <option value="name">Product Name</option>
          <option value="manufacturer">Manufacturer</option>
          {/* <option value={category}>Category</option> */}
          <option value="description">description</option>
        </NativeSelect>
      </FormControl>
      <TextField
        id="outlined-Name"
        label="Search All Products"
        type="text"
        placeholder="Product Name"
        className={classes.textField}
        value={values.searchTerm}
        onChange={handleChange('searchTerm')}
        margin="normal"
        variant="outlined"
      />
      <Link to="/search">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            props.submitSearch(values.searchTerm, values.searchOption)
          }
        >
          Submit
        </Button>
      </Link>
    </form>
  )
}

const mapDispatch = dispatch => ({
  submitSearch: (searchTerm, searchOption) =>
    dispatch(fetchSearch(searchTerm, searchOption))
})

export default withRouter(connect(null, mapDispatch)(SearchBar))
