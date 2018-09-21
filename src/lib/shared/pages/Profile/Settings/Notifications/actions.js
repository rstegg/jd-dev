export const resetNotifications = () =>
({
  type: 'RESET_NOTIFICATIONS'
})

export const onSaveNotificationsSettings = (address, user) =>
({
  type: 'SAVE_NOTIFICATIONS_SETTINGS',
  payload: {
    address,
    user
  }
})

export const onSaveNotificationsSettingsSuccess = res =>
({
  type: 'SAVE_NOTIFICATIONS_SETTINGS_SUCCESS',
  payload: {
    address: res.body.address,
    token: res.body.token
  }
})

export const onSaveNotificationsSettingsFailure = error =>
({
  type: 'SAVE_NOTIFICATIONS_SETTINGS_FAILURE',
  payload: {
    error
  }
})
