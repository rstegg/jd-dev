import uuid from 'uuid/v4'

const initialState = {
  settings: {},
  orders: []

}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'NEW_ORDER_ASSIGNED':
      return state.orders.concat({ order: action.payload.order, uid: uuid() })
      case 'REMOVE_NOTIFICATION':
        return { ...state, orders: [] }
      case 'LOGOUT_SUBMIT':
        return initialState
    default:
      return state
  }
}
