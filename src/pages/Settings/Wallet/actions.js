export const openAddBank = () =>
({
  type: 'OPEN_ADD_BANK'
})

export const closeAddBank = () =>
({
  type: 'CLOSE_ADD_BANK'
})

export const openWithdrawBank = () =>
({
  type: 'OPEN_WITHDRAW_BANK'
})

export const closeWithdrawBank = () =>
({
  type: 'CLOSE_WITHDRAW_BANK'
})

export const setFocusedBankField = field =>
({
  type: 'SET_FOCUSED_BANK_FIELD',
  payload: {
    field
  }
})

export const onAddBankFormChange = (field, value) =>
({
  type: 'ON_ADD_BANK_FORM_CHANGE',
  payload: {
    field,
    value
  }
})

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


export const fetchStripeCards = user =>
({
  type: 'FETCH_STRIPE_CARDS',
  payload: {
    user
  }
})

export const onFetchStripeCardsSuccess = res =>
({
  type: 'FETCH_STRIPE_CARDS_SUCCESS',
  payload: {
    stripeCards: res.body.stripeCards
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
