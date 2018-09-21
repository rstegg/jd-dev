export const resetAddress = () =>
({
  type: 'RESET_ADDRESS'
})

export const onSaveAddressSettings = (address, user) =>
({
  type: 'SAVE_ADDRESS_SETTINGS',
  payload: {
    address,
    user
  }
})

export const onSaveAddressSettingsSuccess = res =>
({
  type: 'SAVE_ADDRESS_SETTINGS_SUCCESS',
  payload: {
    address: res.body.address,
    token: res.body.token
  }
})

export const onSaveAddressSettingsFailure = error =>
({
  type: 'SAVE_ADDRESS_SETTINGS_FAILURE',
  payload: {
    error
  }
})
