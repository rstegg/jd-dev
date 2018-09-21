/* eslint camelcase: 0 */
const initialState = {
  isOpen: false,
  isWithdrawOpen: false,
  isFetching: null,
  focused: null,
  account_holder_name: '',
  routing_number: '',
  account_number: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'FETCH_STRIPE_BANKS_SUCCESS':
    return Object.assign({}, state, {
      list: action.payload.stripeCards
    })
  case 'ADD_STRIPE_BANK_SUCCESS':
    return Object.assign({}, state, {
      list: [ ...state.list, action.payload.stripe_card ]
    })
  case 'SET_FOCUSED_BANK_FIELD':
    return Object.assign({}, state, {
      focused: action.payload.field
    })
  case 'ON_ADD_CREDIT_BANK_FORM_CHANGE':
    return Object.assign({}, state, {
      [action.payload.field]: action.payload.value
    })
  case 'OPEN_WITHDRAW_BANK':
    return Object.assign({}, state, {
      isWithdrawOpen: true
    })
  case 'OPEN_ADD_BANK':
    return Object.assign({}, state, {
      isOpen: true
    })
  case 'CLOSE_WITHDRAW_BANK':
  case 'CLOSE_ADD_BANK':
    return initialState
  default:
    return state
  }
}
