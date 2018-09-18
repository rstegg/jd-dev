export const addStripeCard = (card, user) =>
({
  type: 'ADD_STRIPE_CARD',
  payload: {
    card,
    user
  }
})

export const onAddStripeCardSuccess = res =>
({
  type: 'ADD_STRIPE_CARD_SUCCESS',
  payload: {
    stripe_card: res.body.stripe_card
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
