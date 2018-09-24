const initialState = {
  accepted: [],
  rejected: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'ACCEPT_STL':
      return Object.assign({}, state, { accepted: [ ...state.accepted, action.payload.accepted ] })
    case 'ACCEPT_XML':
      return Object.assign({}, state, { accepted: [ ...state.accepted, action.payload.accepted ] })
    case 'ACCEPT_ZIP':
      return Object.assign({}, state, { accepted: [ ...state.accepted, action.payload.accepted ] })
    case 'ACCEPT_GENERIC':
      return Object.assign({}, state, { accepted: [ ...state.accepted, action.payload.accepted ] })
    case 'REJECT_STL':
      return Object.assign({}, state, { rejected: [ ...state.rejected, action.payload.rejected ] })
    case 'DELETE_PRODUCT':
      return Object.assign({}, state, { accepted: [ ...state.accepted.slice(0, action.payload.idx),
              ...state.accepted.slice(action.payload.idx+1) ] })
    case 'LOGOUT_SUBMIT':
      return initialState
    default:
      return state
  }
}
