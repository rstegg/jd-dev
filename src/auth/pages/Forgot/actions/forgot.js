import su from 'superagent'
import { SubmissionError } from 'redux-form'

export const onForgotSubmit = user =>
  dispatch => {
    dispatch({ type: 'FORGOT_SUBMIT' })
    return su.post('/api/v1/auth/password/request')
      .accept('application/json')
      .send({ user })
      .then(res => dispatch(onForgotSuccess(res)))
      .then(res => dispatch(resetForgot()))
      .catch(err => {
        throw new SubmissionError({
          _error: 'Forgot failed!'
        })
      })
}

export const onForgotSuccess = res =>
({
  type: 'FORGOT_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})

export const resetForgot = () =>
({
  type: 'RESET_FORGOT'
})
