export const joinRoom = (uid, token) => ({
  type: 'WS/JOIN_ROOM',
  payload: {
    uid,
    token
  }
})

export const removeNotification = (uid) => ({
  type: 'REMOVE_NOTIFICATION',
  payload: {
    uid
  }
})

export const socketDisconnect = token => ({
  type: 'WS/SOCKET_DISCONNECT',
  payload: {
    token
  }
})
