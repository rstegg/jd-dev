const initialState = []

export default (state=initialState, action) => {
  switch(action.type) {
    case 'POPULATE_TYPES':
      return action.payload.productTypes
    default:
      return state
  }
}
