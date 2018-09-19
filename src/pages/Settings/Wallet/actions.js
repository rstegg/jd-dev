import su from 'superagent'
import { path } from 'ramda'
import { SubmissionError } from 'redux-form'

export const openAddBitcoin = () =>
({
  type: 'OPEN_ADD_BITCOIN'
})

export const closeAddBitcoin = () =>
({
  type: 'CLOSE_ADD_BITCOIN'
})

export const openWithdrawBitcoin = () =>
({
  type: 'OPEN_WITHDRAW_BITCOIN'
})

export const closeWithdrawBitcoin = () =>
({
  type: 'CLOSE_WITHDRAW_BITCOIN'
})

export const setFocusedBitcoinField = field =>
({
  type: 'SET_FOCUSED_BITCOIN_FIELD',
  payload: {
    field
  }
})

export const onAddBitcoinFormChange = (field, value) =>
({
  type: 'ON_ADD_BITCOIN_FORM_CHANGE',
  payload: {
    field,
    value
  }
})


export const fetchStripeCards = token =>
  dispatch => {
    dispatch({ type: 'FETCH_STRIPE_CARDS', payload: { token } })
    return su.get('/api/v1/stripe/cards')
    .type('application/json')
    .accept('application/json')
    .set('Authorization', token)
    .then(res => dispatch(onFetchStripeCardsSuccess(res)))
    .catch(err => console.error(err))
  }

export const onFetchStripeCardsSuccess = res =>
({
  type: 'FETCH_STRIPE_CARDS_SUCCESS',
  payload: {
    stripeCards: res.body.stripeCards,
    stripeCustomer: res.body.stripeCustomer,
  }
})

export const openAddCard = () =>
({
  type: 'OPEN_ADD_CARD'
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
