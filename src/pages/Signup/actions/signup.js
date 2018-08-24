import su from 'superagent'
import { SubmissionError } from 'redux-form'

export const onSignupSubmit = user =>
  dispatch => {
    dispatch({ type: 'SIGNUP_SUBMIT' })
    return su.post('/api/v1/auth/signup')
      .accept('application/json')
      .send({ user })
      .then(res => dispatch(onSignupSuccess(res)))
      .catch(err => {
        throw new SubmissionError({
          _error: 'Signup failed!'
        })
      })
}

export const onSignupSuccess = res =>
({
  type: 'SIGNUP_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})

export const resetSignup = () =>
({
  type: 'RESET_SIGNUP'
})
