const initialState = {
  isContactsOpened: false,
  contactsUnseen: 0,
  contacts: [{ name: 'Fred aoijaweoifjaweofijswaiuwhefaiwojefioawjfoaiwjef', email: 'testemail@yahoo.com', localId: '1', isOpen: false, isShowing: false }],
  messages: [],
  threadId: null,
  isFetching: null
}

export default function(state = initialState, action) {
  switch (action.type) {
  case 'OPEN_CONTACT_CHAT':
    return Object.assign({}, state, {
      contacts: [...state.contacts.slice(0, action.payload.idx),
          { ...action.payload.contact, isOpen: true, isShowing: true },
          ...state.contacts.slice(action.payload.idx + 1)]
    })
  case 'CLOSE_CONTACT_CHAT':
    return Object.assign({}, state, {
      contacts: [...state.contacts.slice(0, action.payload.idx),
          { ...action.payload.contact, isOpen: false, isShowing: false },
          ...state.contacts.slice(action.payload.idx + 1)]
    })
  case 'TOGGLE_CHAT_CONTACTS':
    return Object.assign({}, state, {
      isContactsOpened: !state.isContactsOpened
    })
  case 'CLOSE_CONTACT_MENU':
    return Object.assign({}, state, {
      isContactsOpened: false
    })
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
