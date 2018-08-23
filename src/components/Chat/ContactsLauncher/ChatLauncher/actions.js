export const closeContactChat = (contact, idx) => ({
  type: 'CLOSE_CONTACT_CHAT',
  payload: {
    contact,
    idx
  }
})
