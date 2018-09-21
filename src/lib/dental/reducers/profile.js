const initialState = {
  userId: null,
  isLoading: false,
  isEdited: false,
  isFetching: null,
  focused: null,
  newUsername: false,
  isAdmin: false,
  isCropperOpen: false,
  imagePreview: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'OPEN_PROFILE_CROPPER':
    return Object.assign({}, state, {
      isCropperOpen: true,
      imagePreview: action.payload.image
    })
  case 'CLOSE_PROFILE_CROPPER':
    return Object.assign({}, state, {
      isCropperOpen: false,
      imagePreview: null
    })
  case 'SWITCH_TO_PROFILE_ADMIN':
    return Object.assign({}, state, {
      isAdmin: true
    })
  case 'SWITCH_TO_PROFILE_USER':
    return Object.assign({}, state, {
      isAdmin: false
    })
  case 'EDIT_PROFILE_FIELD':
    return Object.assign({}, state, {
      focused: action.payload.field
    })
  case 'FETCH_PROFILE':
    return Object.assign({}, state, {
      isFetching: action.payload.username,
      isAdmin: false
    })
  case 'FETCH_PROFILE_SUCCESS':
    return Object.assign({}, state, {
      ...action.payload.profile,
      userId: action.payload.profile.id,
      isLoading: false,
      isFetching: null,
      isEdited: false,
      isAdmin: false
    })
  case 'ON_PROFILE_SUBMIT':
    return Object.assign({}, state, {
      isLoading: true,
      isEdited: false,
      focused: null
    })
  case 'EDIT_PROFILE_SUCCESS':
    return Object.assign({}, state, {
      ...state,
      ...action.payload.user,
      isLoading: false,
      isEdited: true,
      newUsername: action.payload.user.username !== state.username
    })
  case 'UPLOAD_PROFILE_IMAGE_SUCCESS':
    return Object.assign({}, state, {
      image: action.payload.image,
      imageLoading: false,
      imageError: false
    })
  case 'REFRESH_PROFILE':
    return Object.assign({}, state, {
      isLoading: false,
      isEdited: false,
      newUsername: false
    })
  case 'LOGOUT_SUBMIT':
    return initialState
  default:
    return state
  }
}
