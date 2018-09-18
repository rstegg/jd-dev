import su from 'superagent'
const API_HOST = '/api/v1'

export const validate = values => {
  const errors = {}
  if (!values.oldPassword) {
    errors.oldPassword = 'Required'
  }
  if (values.newPassword < 6) {
    errors.newPassword = '6 or more characters'
  }
  return errors
}

export const asyncValidate = (values, dispatch, props, field) => {
  const previousErrors = props.asyncErrors
  return new Promise((resolve, reject) => {
    if (field === 'username') {
      reject(su.post(`${API_HOST}/auth/signup/validate_username`)
        .send({ username: values.username })
        .set('Accept', 'application/json')
        .then(res => {
          if (res.body.usernameTaken) {
            // eslint-disable-next-line
            throw Object.assign({}, previousErrors, { username: 'That username is taken'})
          }
        }).catch(err => err)
      )
    } else if (field === 'email') {
      reject(su.post(`${API_HOST}/auth/signup/validate_email`)
        .send({ email: values.email })
        .set('Accept', 'application/json')
        .then(res => {
          if (res.body.emailTaken) {
            // eslint-disable-next-line
            throw Object.assign({}, previousErrors, { email: 'That email is already registerd'})
          }
        }).catch(err => err)
      )
    } else if (previousErrors) {
      reject(previousErrors)
    } else {
      resolve()
    }
  }).catch(err => err)
}
