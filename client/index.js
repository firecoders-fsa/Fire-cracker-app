import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import CheckoutForm from './components/CheckoutForm'
import {Elements, StripeProvider} from 'react-stripe-elements'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <StripeProvider apiKey="pk_test_RqyEzr4qvsfgEFi9dQCChC4M">
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
