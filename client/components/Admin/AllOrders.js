// import React from 'react'
// import {withRouter, Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {fetchOrders} from ''
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     marginTop: theme.spacing(3),
//     width: '100%',
//     overflowX: 'auto',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

// function createData(status, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = allOrders.map(createData(''))

// [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export function AllOrders(props) {
//   const classes = useStyles();
//   const allOrders = props.allOrders
//   return (
//     <div>
//       {allOrders.map(order => (
//         <div key={order.id}>
//             <h4>{product.name}</h4>
//             <img src={product.images.map(img => img.imageURL)} />
//             <h5>${product.price / 100}</h5>
//           </Link>
//         </div>
//       ))}
//     </div>
//   )
// }

// const mapState = state => ({
//   allOrders: state.AllOrders
// })

// const mapDispatch = dispatch => ({
//   getOrders: () => dispatch(fetchOrders())
// })

// export default withRouter(connect(mapState, mapDispatch)(AllOrders))
