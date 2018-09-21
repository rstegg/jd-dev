const isFunction = x => typeof x === 'function'
const isString = x => typeof x === 'string'
const isArray = x => Array.isArray(x)

const isSocketAction = (action, prefix) => {
  if (!action || !action.type) {
    return false
  }
  if (isFunction(prefix)) {
    return prefix(action.type, action)
  }
  if (isString(prefix)) {
    return action.type.indexOf(prefix) === 0
  }
  if (isArray(prefix)) {
    return prefix.some(item => action.type.indexOf(item) === 0)
  }
  return false
}

export default (socket, prefix = []) => {
  return ({ dispatch }) => {
    socket.on('action', dispatch)
    return next => action => {
      if (isSocketAction(action, prefix)) {
        socket.emit('action', action)
      }
      return next(action)
    }
  }
}
