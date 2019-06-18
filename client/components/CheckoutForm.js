import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      email: undefined,
      address: undefined
    }
    this.submit = this.submit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})

    let response = await fetch('/api/cart/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      this.props.completeCart(this.state.email, this.state.address)
      this.setState({complete: true})
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      email: event.target.email.value,
      address: event.target.address.value
    })
  }
  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    if (
      this.state.email === undefined &&
      this.state.address === undefined &&
      this.props.user.email === undefined &&
      this.props.user.address === undefined
    ) {
      console.log('state here! ', this.state)
      return (
        <div>
          You are missing either an email or a shipping address, please enter
          them below.
          <br />
          <form onSubmit={this.handleSubmit}>
            Email address:
            <input type="text" name="email" />
            <br />
            Shipping address:
            <input type="text" name="address" />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    } else {
      return (
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Send</button>
        </div>
      )
    }
  }
}

export default injectStripe(CheckoutForm)
