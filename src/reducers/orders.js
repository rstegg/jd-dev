const initialState = []

const mapOrdersToothUnits = orders => orders.map(order => ({ ...order, unitsView: order.units ? order.units.join(', ') : null }))

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ORDERS_SUCCESS':
      return mapOrdersToothUnits(action.payload.orders)
    case 'ADD_NEW_ORDERS':
      return state.concat( mapOrdersToothUnits(action.payload.orders) )
    case 'ADD_EXTRA_SCAN_FILE':
      const scanOrdersUIDs = state.map(order => order.uid)
      const scanOrderIDX = scanOrdersUIDs.indexOf(action.payload.order.uid)
      return [ ...state.slice(0, scanOrderIDX),
              { ...action.payload.order, caseFileUrls: action.payload.order.caseFileUrls.concat(action.payload.file) },
              ...state.slice(scanOrderIDX+1) ]
    case 'ADD_EXTRA_NOTE':
      const noteOrderUIDs = state.map(order => order.uid)
      const noteOrderIDX = noteOrderUIDs.indexOf(action.payload.order.uid)
      const currNotes = action.payload.order.notes || []
      return [ ...state.slice(0, noteOrderIDX),
              { ...action.payload.order, notes: currNotes.concat(action.payload.note) },
              ...state.slice(noteOrderIDX+1) ]
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
