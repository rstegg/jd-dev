import React, { Component } from 'react'

import { Field, reduxForm } from 'redux-form'

import { Spin, Col, Alert, Form, Button, Input, Icon } from 'antd'

import { normalizeCCNumber, normalizeExpiry, normalizeCVV } from './normalize'
import { validate } from './validators'

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
    const { error, submitting, handleSubmit } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <CardElement style={{ base: { fontSize: '18px' }}} />
      </form>
    )
  }
}

export default injectStripe(CardForm, {withRef: true})
