const initialState = {
  accepted: [],
  rejected: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'ACCEPT_UPLOAD':
      return Object.assign({}, state, { accepted: [ ...state.accepted, action.payload.accepted ] })
    case 'REJECT_UPLOAD':
      return Object.assign({}, state, { rejected: [ ...state.rejected, action.payload.rejected ] })
    case 'DELETE_PRODUCT':
      return Object.assign({}, state, { accepted: [ ...state.accepted.slice(0, action.payload.idx),
              ...state.accepted.slice(action.payload.idx+1) ] })

    default:
      return state
  }
}
