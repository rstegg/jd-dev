export const onSignupSubmit = user =>
({
  type: 'SIGNUP_SUBMIT',
  payload: {
    user
  }
})

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
