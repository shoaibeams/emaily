import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500} //100 equals 1USD
        token={token => this.props.handleToken(token)}
        stripeKey="pk_test_k1djvF6BxanOYiBkg1oRhOdY"
      >
        <button className="btn">Add credit</button>
      </StripeCheckout>
    )
  }
}

export default connect(
  null,
  actions
)(Payments)
