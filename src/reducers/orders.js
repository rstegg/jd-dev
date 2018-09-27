const initialState = []

const mapOrders = orders => orders.map(mapSingleOrder)

const mapSingleOrder = order => order.user ? { ...order, userImage: order.user.image, userName: order.user.name, userMail: order.user.email, unitsView: order.units ? order.units.join(', ') : null }
  : { ...order, unitsView: order.units ? order.units.join(', ') : null }

const ordersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ORDERS_SUCCESS':
    case 'ADMIN_FETCH_ORDERS_SUCCESS':
      return mapOrders(action.payload.orders)
    case 'ADD_NEW_ORDERS':
      return state.concat( mapOrders(action.payload.orders) )
    case 'ADD_EXTRA_SCAN_FILE':
    case 'ADMIN_ADD_EXTRA_SCAN_FILE':
      const scanOrdersUIDs = state.map(order => order.uid)
      const scanOrderIDX = scanOrdersUIDs.indexOf(action.payload.order.uid)
      return [ ...state.slice(0, scanOrderIDX),
              { ...action.payload.order, scanFileUrls: action.payload.order.scanFileUrls.concat(action.payload.file) },
              ...state.slice(scanOrderIDX+1) ]
    case 'ADMIN_ADD_DESIGN_FILE':
      const scanCaseUIDs = state.map(order => order.uid)
      const scanCaseIDX = scanCaseUIDs.indexOf(action.payload.order.uid)
      const previousOrderDesignUrls = action.payload.order.designFileUrls || []
      return [ ...state.slice(0, scanCaseIDX),
              { ...action.payload.order, designFileUrls: previousOrderDesignUrls.concat(action.payload.file) },
              ...state.slice(scanCaseIDX+1) ]
    case 'ADD_EXTRA_NOTE':
    case 'ADMIN_ADD_EXTRA_NOTE':
      const noteOrderUIDs = state.map(order => order.uid)
      const noteOrderIDX = noteOrderUIDs.indexOf(action.payload.order.uid)
      const currNotes = action.payload.order.notes || []
      return [ ...state.slice(0, noteOrderIDX),
              { ...action.payload.order, notes: currNotes.concat({ user: action.payload.user.name, text: action.payload.note }) },
              ...state.slice(noteOrderIDX+1) ]
    case 'SET_ORDER_PREFS':
    case 'ADMIN_SET_ORDER_PREFS':
      const prefsOrderUIDs = state.map(order => order.uid)
      const prefsOrderIDX = noteOrderUIDs.indexOf(action.payload.order.uid)
      const currPrefs = { contact: state.orders[prefsOrderIDX].contact, occlusion: state.orders[prefsOrderIDX].contact, pontic: state.orders[prefsOrderIDX].contact, linerSpacer: state.orders[prefsOrderIDX].contact }
      return [ ...state.slice(0, noteOrderIDX),
              { ...action.payload.order, contact: action.payload.prefs.contact || currPrefs.contact,
              occlusion: action.payload.prefs.occlusion || currPrefs.occlusion, pontic: action.payload.prefs.pontic || currPrefs.pontic,
              linerSpacer: action.payload.prefs.linerSpacer || currPrefs.linerSpacer },
              ...state.slice(noteOrderIDX+1) ]
    case 'CANCEL_ORDER':
    case 'ADMIN_CANCEL_ORDER':
      const uids = state.map(s => s.uid)
      const puid = action.payload.order.uid
      const idx = uids.indexOf(puid)
      return [ ...state.slice(0, idx),
              { ...action.payload.order, status: 'canceled' },
              ...state.slice(idx+1) ]
    case 'LOGOUT_SUBMIT':
      return initialState
    default:
      return state
  }
}

export default ordersReducer
