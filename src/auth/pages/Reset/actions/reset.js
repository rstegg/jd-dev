import su from 'superagent'
import { SubmissionError } from 'redux-form'

export const onResetSubmit = (permalink, verifyToken, user) =>
  dispatch => {
    dispatch({ type: 'RESET_SUBMIT' })
    return su.post(`/api/v1/auth/password/reset/${permalink}/${verifyToken}`)
      .type('application/json')
      .accept('application/json')
      .send({ user })
      .then(res => dispatch(onResetSuccess(res)))
      .then(res => dispatch(resetReset()))
      .catch(err => {
        throw new SubmissionError({
          _error: 'Invalid link! Please request a new link.'
        })
      })
}

export const onResetSuccess = res =>
({
  type: 'RESET_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})

export const resetReset = () =>
({
  type: 'RESET_RESET',
})
