export const onLoginSubmit = ({username, password}) =>
({
  type: 'LOGIN_SUBMIT',
  payload: {
    username,
    password
  }
})

export const onLoginSuccess = res =>
({
  type: 'LOGIN_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})
