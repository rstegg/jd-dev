const initialState = {
  id: null,
  token: '',
  isAuthenticated: false,
  isRegistered: false,
  image: '',
  isLoading: false,
  error: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_SUBMIT':
    case 'SIGNUP_SUBMIT':
      return Object.assign({}, state, {
        error: null,
        isLoading: true
      })
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.user,
        isAuthenticated: true,
        token: 'JWT ' + action.payload.token,
        error: false,
        isLoading: false
      })
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.user,
        isAuthenticated: true,
        token: 'JWT ' + action.payload.token,
        isRegistered: true,
        error: false,
        isLoading: false
      })
    case 'EDIT_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.user,
        error: false,
        isLoading: false,
      })
    case 'UPLOAD_AVATAR_SUCCESS':
      return Object.assign({}, state, {
        image: action.payload.image
      })
    case 'RESET_SIGNUP':
      return Object.assign({}, state, {
        isRegistered: false,
        isLoading: false
      })
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return Object.assign({}, state, {
        error: true,
        isLoading: false
      })
    case 'LOGOUT':
      return initialState
    case 'UPLOAD_AVATAR_FAILURE':
    case 'EDIT_PROFILE_FAILURE':
    default:
      return state
  }
}
