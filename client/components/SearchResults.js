import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}))

export function SearchResults(props) {
  const classes = useStyles()

  const productsArray = props.searchProducts
  console.log(
    'This is productsArray.searchProducts',
    productsArray.searchProducts
  )
  if (productsArray.searchProducts.length > 0) {
    console.log('there are products!', productsArray.length)
    return (
      <div>
        {productsArray.searchProducts.map(product => (
          <div key={product.id}>
            <Link
              to={`/products/${product.id}`}
              onClick={() => this.props.fetchProduct(product.id)}
            >
              <Card className={classes.card}>
                <CardHeader
                  title={product.name}
                  subheader={product.manufacturer}
                />
                <CardMedia
                  className={classes.media}
                  image={product.images[0].imageURL}
                  title="Product Picture"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    ${product.price / 100}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    )
  } else {
    console.log('else statement')
    return <div>No products with that name</div>
  }
}

const mapState = state => ({
  searchProducts: state.searchProducts
})

export default withRouter(connect(mapState, null)(SearchResults))
