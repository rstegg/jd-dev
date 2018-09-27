const initialState = {
  id: null,
  token: '',
  isAuthenticated: false,
  isRegistered: false,
  image: '',
  isLoading: false,
  users: [],
  createUserLoading: false,
  createUserSuccess: false,
  error: null,
  userCount: 0,
  orderCount: 0,
  designerCount: 0,
  finishedOrderCount: 0,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ADMIN_DASHBOARD_SUCCESS':
      return Object.assign({}, state, {
        userCount: action.payload.userCount,
        orderCount: action.payload.orderCount,
        designerCount: action.payload.designerCount,
        finishedOrderCount: action.payload.finishedOrderCount,
      })
    case 'FETCH_USERS_SUCCESS':
    case 'BAN_USER_SUCCESS':
    case 'UNBAN_USER_SUCCESS':
      return Object.assign({}, state, {
        users: action.payload.users
      })
    case 'CREATE_USER_SUCCESS':
      const userList = state.users || []
      return Object.assign({}, state, {
        users: userList.concat(action.payload.user),
        createUserLoading: false,
        createUserSuccess: true,
      })
    case 'RESET_CREATE_USER':
      return Object.assign({}, state, {
        createUserLoading: false,
        createUserSuccess: false,
      })
    case 'LOGOUT_SUBMIT':
      return initialState
    default:
      return state
  }
}
