const initialState = {
  messages: [],
  threadId: null,
  isFetching: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'RECEIVE_THREAD_CHAT_MESSAGE':
    return Object.assign({}, state, {
      messages: [ ...state.messages, action.payload.message ]
    })
  case 'RECEIVE_THREAD_CHAT_MESSAGES':
    return Object.assign({}, state, {
      messages: action.payload.messages || [],
      isFetching: null
    })
  case 'WS/JOIN_THREAD':
    return Object.assign({}, state, {
      isFetching: action.payload.threadId,
      threadId: action.payload.threadId
    })
  case 'WS/LEAVE_THREAD':
    return Object.assign({}, state, {
      isFetching: null,
      threadId: null
    })
  case 'JOIN_THREAD_SUCCESS':
    return Object.assign({}, state, {
      messages: action.payload.messages || [],
      threadId: action.payload.threadId,
      isFetching: null
    })
  case 'SEND_MESSAGE_FAILURE':
  default:
    return state
  }
}
