export const resetAccount = () =>
({
  type: 'RESET_ACCOUNT'
})

export const onSaveAccountSettings = (account, user) =>
({
  type: 'SAVE_ACCOUNT_SETTINGS',
  payload: {
    account,
    user
  }
})

export const onSaveAccountSettingsSuccess = res =>
({
  type: 'SAVE_ACCOUNT_SETTINGS_SUCCESS',
  payload: {
    account: res.body.account,
    token: res.body.token
  }
})

export const onSaveAccountSettingsFailure = error =>
({
  type: 'SAVE_ACCOUNT_SETTINGS_FAILURE',
  payload: {
    error
  }
})
