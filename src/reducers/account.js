const initialState = {
  userId: null,
  isLoading: false,
  isSuccessful: false,
  isFetching: null,
  focused: null,
  newUsername: false,
  isAdmin: false,
  isCropperOpen: false,
  imagePreview: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'SAVE_ACCOUNT_SETTINGS':
    return Object.assign({}, state, {
      isLoading: true,
    })
  case 'SAVE_ACCOUNT_SETTINGS_SUCCESS':
    return Object.assign({}, state, {
      isLoading: false,
      isSuccessful: true,
    })
  case 'SAVE_ACCOUNT_SETTINGS_FAILURE':
    return Object.assign({}, state, {
      isLoading: false,
      isSuccessful: false,
    })
  case 'RESET_ACCOUNT_SETTINGS_FORM':
    return Object.assign({}, state, {
      isLoading: false,
      isSuccessful: false,
    })
  case 'LOGOUT_SUBMIT':
    return initialState
  default:
    return state
  }
}
