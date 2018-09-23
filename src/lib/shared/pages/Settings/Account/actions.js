import su from 'superagent'
import { SubmissionError } from 'redux-form'

export const resetAccount = () =>
({
  type: 'RESET_ACCOUNT'
})

export const onSaveAccountSettings = (account, token) =>
  dispatch => {
    dispatch({ type: 'SAVE_ACCOUNT_SETTINGS', payload: { account } })
    return su.post('/api/v1/auth/change_password')
      .accept('application/json')
      .set('Authorization', token)
      .send({ user: account })
      .then(res => dispatch(onSaveAccountSettingsSuccess(res)))
      .catch(err => {
        dispatch(onSaveAccountSettingsFailure(err))
        throw new SubmissionError({
          oldPassword: 'Invalid password!'
        })
      })
  }

export const onSaveAccountSettingsSuccess = res =>
({
  type: 'SAVE_ACCOUNT_SETTINGS_SUCCESS',
  payload: {
    account: res.body.user,
  }
})

export const onSaveAccountSettingsFailure = error =>
({
  type: 'SAVE_ACCOUNT_SETTINGS_FAILURE',
  payload: {
    error
  }
})

export const resetAccountSettings = () =>
({
  type: 'RESET_ACCOUNT_SETTINGS_FORM'
})
