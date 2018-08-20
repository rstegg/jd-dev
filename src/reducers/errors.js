const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFY_ERRORS':
      return action.payload.errors
    case 'OPEN_NOTIFICATION':
      return initialState
    default:
      return state
  }
}
