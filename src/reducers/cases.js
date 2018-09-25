const initialState = []

const mapOrders = orders => orders.map(mapSingleOrder)

const mapSingleOrder = order => order.user ? { ...order, userImage: order.user.image, userName: order.user.name, userMail: order.user.email, unitsView: order.units ? order.units.join(', ') : null }
  : { ...order, unitsView: order.units ? order.units.join(', ') : null }

const casesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_CASES_SUCCESS':
      return mapOrders(action.payload.cases)
    case 'NEW_ORDER_ASSIGNED':
      return state.concat( mapSingleOrder(action.payload.order) )
    case 'ADD_DESIGN_FILE':
      const scanCaseUIDs = state.map(order => order.uid)
      const scanOrderIDX = scanCaseUIDs.indexOf(action.payload.order.uid)
      const previousOrderDesignUrls = action.payload.order.designFileUrls || []
      return [ ...state.slice(0, scanOrderIDX),
              { ...action.payload.order, designFileUrls: previousOrderDesignUrls.concat(action.payload.file) },
              ...state.slice(scanOrderIDX+1) ]
    case 'ADD_DESIGN_NOTE':
      const noteOrderUIDs = state.map(order => order.uid)
      const noteOrderIDX = noteOrderUIDs.indexOf(action.payload.order.uid)
      const currNotes = action.payload.order.notes || []
      const designers = action.payload.order.designers
      const lastDesigner = designers[designers.length - 1]
      return [ ...state.slice(0, noteOrderIDX),
              { ...action.payload.order, notes: currNotes.concat({ user: lastDesigner.name, text: action.payload.note }) },
              ...state.slice(noteOrderIDX+1) ]
    case 'CANCEL_CASE':
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

export default casesReducer
