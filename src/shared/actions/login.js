import su from 'superagent'
import { SubmissionError } from 'redux-form'

export const onLoginSubmit = ({ email, password }) =>
  dispatch => {
    dispatch({ type: 'LOGIN_SUBMIT' })
    return su.post('/api/v1/auth/login')
      .accept('application/json')
      .send({ email, password })
      .then(res => dispatch(onLoginSuccess(res)))
      .catch(err => {
        throw new SubmissionError({
          _error: 'Login failed!'
        })
      })
}

export const onLoginSuccess = res =>
({
  type: 'LOGIN_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})

export const onLogoutSubmit = token =>
  dispatch => {
    dispatch({ type: 'LOGOUT_SUBMIT' })
    return su.post('/api/v1/auth/logout')
      .accept('application/json')
      .set('Authorization', token)
      .then(res => {
        dispatch(onLogoutSuccess(res))
        window.location.href = '/'
      })
      .catch(err => {
        console.log(err)
      })
  }

export const onLogoutSuccess = res =>
({
  type: 'LOGOUT_SUCCESS'
})
