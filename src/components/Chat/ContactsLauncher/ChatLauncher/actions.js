export const closeContactChat = (contact, idx) => ({
  type: 'CLOSE_CONTACT_CHAT',
  payload: {
    contact,
    idx
  }
})

export const leaveChatThread = (threadId, user) =>
({
  type: 'WS/LEAVE_THREAD',
  payload: {
    threadId,
    user
  }
})

export const sendThreadChatMessage = (text, threadId, token) =>
({
  type: 'WS/SEND_THREAD_CHAT_MESSAGE',
  payload: {
    text,
    threadId,
    token,
  }
})
