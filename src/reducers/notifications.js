import uuid from 'uuid/v4'

const initialState = []

export default (state=initialState, action) => {
  switch(action.type) {
    case 'NEW_ORDER_ASSIGNED':
      return state.concat({ order: action.payload.order, uid: uuid() })
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}
