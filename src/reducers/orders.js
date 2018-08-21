const initialState = []

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return action.payload.orders
    case 'ADD_NEW_ORDERS':
      return state.concat(action.payload.orders)
    default:
      return state
  }
}

export default ordersReducer
