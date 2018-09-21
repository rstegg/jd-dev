const initialState = []

const mapCases = cases => cases.map(c => ({ ...c, userImage: c.user.image, userName: c.user.name, userMail: c.user.email, unitsView: c.units ? c.units.join(', ') : null }))

const casesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_CASES_SUCCESS':
      return mapCases(action.payload.cases)
    case 'ADD_DESIGN_FILE':
      const scanCaseUIDs = state.map(order => order.uid)
      const scanOrderIDX = scanCaseUIDs.indexOf(action.payload.order.uid)
      return [ ...state.slice(0, scanOrderIDX),
              { ...action.payload.order, designFileUrls: action.payload.order.designFileUrls.concat(action.payload.file) },
              ...state.slice(scanOrderIDX+1) ]
    case 'ADD_DESIGN_NOTE':
      const noteOrderUIDs = state.map(order => order.uid)
      const noteOrderIDX = noteOrderUIDs.indexOf(action.payload.order.uid)
      const currNotes = action.payload.order.notes || []
      return [ ...state.slice(0, noteOrderIDX),
              { ...action.payload.order, notes: currNotes.concat(action.payload.note) },
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
