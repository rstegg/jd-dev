const initialState = {
  id: null,
  isLoading: false,
  processedOrders: 0,
  completedOrders: 0,
  canceledOrders: 0,
  newOrders: 0,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_DASHBOARD':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'FETCH_DASHBOARD_SUCCESS':
      return Object.assign({}, state, {
        processedOrders: action.payload.processedOrders,
        completedOrders: action.payload.completedOrders,
        canceledOrders: action.payload.canceledOrders,
        newOrders: action.payload.newOrders,
      })
    case 'LOGOUT_SUBMIT':
      return initialState
    default:
      return state
  }
}
