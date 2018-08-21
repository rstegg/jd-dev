import su from 'superagent'

export const onLoginSubmit = ({username, password}) => dispatch => {
  dispatch({ type: 'LOGIN_SUBMIT' })
  su.post('/api/v1/login')
    .send({ username, password })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export const onLoginSuccess = res =>
({
  type: 'LOGIN_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})
