const initialState = {
  redirects: 0,
  isLoading: false
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'REDIRECT_TO_CHECKOUT':
      setTimeout(
        () => window.location.href = action.payload.url, 100
      )
      return {
        isLoading: false,
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
