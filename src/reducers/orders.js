const initialState = []

const mapOrdersToothUnits = orders => orders.map(order => ({ ...order, unitsView: order.units ? order.units.join(', ') : null }))

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return mapOrdersToothUnits(action.payload.orders)
    case 'ADD_NEW_ORDERS':
      return state.concat( mapOrdersToothUnits(action.payload.orders) )
    case 'CANCEL_ORDER':
      const uids = state.map(s => s.uid)
      const puid = action.payload.order.uid
      const idx = uids.indexOf(puid)
      return [ ...state.slice(0, idx),
              { ...action.payload.order, status: 'canceled' },
              ...state.slice(idx+1) ]
    default:
      return state
  }
}

export default ordersReducer
