export const validate = values => {
  const errors = {}
  if (values.password !== values.repeat) {
    errors.repeat = 'Passwords do not match'
  }
  if (!values.repeat) {
    errors.repeat = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}
