import su from 'superagent'

export const onSignupSubmit = user =>
  dispatch => {
    dispatch({ type: 'SIGNUP_SUBMIT' })
    su.post('/api/v1/auth/signup')
      .accept('application/json')
      .send({ user })
      .then(res => dispatch(onSignupSuccess(res)))
      .catch(err => console.log(err))
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
