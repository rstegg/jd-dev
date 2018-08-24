const initialState = {
  redirects: 0,
  shouldRedirect: false,
  isLoading: false
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'CREATE_ORDERS_SUCCESS':
      return {
        isLoading: false,
        shouldRedirect: true,
        redirects: state.redirects,
      }
    case 'REDIRECTING_TO_ORDERS':
      return {
        isLoading: false,
        shouldRedirect: false,
        redirects: state.redirects,
      }
    case 'SET_BUTTON_LOADING':
      return {
        redirects: state.redirects,
        isLoading: action.payload.isLoading
      }
    default:
      return state
  }
}
