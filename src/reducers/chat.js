import { flatten, map, uniqBy, prop, propEq, findIndex } from 'ramda'

const initialState = {
  isContactsOpened: false,
  contactsUnseen: 0,
  contacts: [{ name: 'Fred aoijaweoifjaweofijswaiuwhefaiwojefioawjfoaiwjef', email: 'testemail@yahoo.com', localId: '1', isOpen: false, image: null, isShowing: false, messages: [], case: 'Test Case', caseUID: '123' }],
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
  case 'FETCH_ORDERS_SUCCESS':
    const safeOrders = action.payload.orders.filter(o => o.designers && o.designers.length)
    const designers = flatten(safeOrders.map(o => o.designers && o.designers.map(designer => ({ ...designer, case: o.name, caseUID: o.uid }))))
    return Object.assign({}, state, {
      contacts: uniqBy(prop('caseUID'), state.contacts.concat(designers))
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
    const contactIdx = findIndex(propEq('caseUID', action.payload.threadId), state.contacts)
    const UI_MESSAGES = action.payload.messages.map(msg => ({ text: msg.text, type: 'text', sender: 'client' }))
    const contactsWithMessages = [
      ...state.contacts.slice(0, contactIdx),
      { ...state.contacts[contactIdx], messages: UI_MESSAGES },
      ...state.contacts.slice(contactIdx+1)
    ]
    return Object.assign({}, state, {
      contacts: contactsWithMessages,
      isFetching: null
    })
  case 'SEND_MESSAGE_FAILURE':
  default:
    return state
  }
}
