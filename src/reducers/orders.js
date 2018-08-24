const initialState = []

const mapOrdersToothUnits = orders => orders.map(order => ({ ...order, unitsView: order.units ? order.units.join(', ') : null }))

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return mapOrdersToothUnits(action.payload.orders)
    case 'ADD_NEW_ORDERS':
      return state.concat( mapOrdersToothUnits(action.payload.orders) )
    default:
      return state
  }
}

export default ordersReducer
