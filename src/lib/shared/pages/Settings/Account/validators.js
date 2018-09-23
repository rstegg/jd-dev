import su from 'superagent'
const API_HOST = '/api/v1'

export const validate = values => {
  const errors = {}
  if (!values.oldPassword) {
    errors.oldPassword = 'Required'
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required'
  }
  if (values.newPassword < 6) {
    errors.newPassword = '6 or more characters'
  }
  return errors
}
