import React, { Component } from 'react'
import { Form } from 'antd'
import { CardElement, injectStripe } from 'react-stripe-elements'

class CardForm extends Component {
  onSubmit = () => {
    this.props.stripe.createToken({ name: this.props.user.name })
    .then(({ token, error }) => {
      if (error) {
        console.error('ERROR CREATING TOKEN', error);
        return
      }
      this.props.addStripeCard(token, this.props.user.token)
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <CardElement style={{ base: { fontSize: '18px' }}} />
      </Form>
    )
  }
}

export default injectStripe(CardForm, {withRef: true})
