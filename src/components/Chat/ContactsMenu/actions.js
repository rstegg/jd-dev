export const openContactChat = (contact, idx) => ({
  type: 'OPEN_CONTACT_CHAT',
  payload: {
    contact,
    idx
  }
})

export const closeContactMenu = () => ({
  type: 'CLOSE_CONTACT_MENU'
})
