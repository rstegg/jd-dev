import su from 'superagent'
import { path } from 'ramda'

export const onLoginSubmit = ({ email, password }) =>
  dispatch => {
    dispatch({ type: 'LOGIN_SUBMIT' })
    su.post('/api/v1/auth/login')
      .type('application/json')
      .accept('application/json')
      .send({ email, password })
      .then(res => dispatch(onLoginSuccess(res)))
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
