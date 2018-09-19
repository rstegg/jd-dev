import su from 'superagent'
import { path } from 'ramda'
import { SubmissionError } from 'redux-form'

import { promisify } from 'es6-promisify'

export const addStripeCard = (stripe, token) =>
  dispatch => {
    dispatch({ type: 'ADD_STRIPE_CARD', payload: { stripe, token } })
    return su.post('/api/v1/stripe/cards')
      .type('application/json')
      .accept('application/json')
      .set('Authorization', token)
      .send({ stripe })
      .then(res => dispatch(onAddServerCardSuccess(res)))
      .catch(err => console.log(err))
  }

export const onAddServerCardSuccess = res =>
({
  type: 'ADD_STRIPE_CARD_SUCCESS',
  payload: {
    card: res.body.card,
    customer: res.body.customer
  }
})

export const closeAddCard = () =>
({
  type: 'CLOSE_ADD_CARD'
})

export const setFocusedCardField = field =>
({
  type: 'SET_FOCUSED_CARD_FIELD',
  payload: {
    field
  }
})

export const onAddCreditCardFormChange = (field, value) =>
({
  type: 'ON_ADD_CREDIT_CARD_FORM_CHANGE',
  payload: {
    field,
    value
  }
})
