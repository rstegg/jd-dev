import su from 'superagent'
const API_HOST = '/api/v1'

export const validate = values => {
  const errors = {}
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.repeat || values.password !== values.repeat) {
    errors.repeat = 'passwords do not match'
  }
  return errors
}

export const asyncValidate = (values, dispatch, props, field) => {
  const previousErrors = props.asyncErrors;
  if(field === 'username') {
  return su.post(`${API_HOST}/auth/signup/validate_username`)
    .send({ username: values.username })
    .set('Accept', 'application/json')
    .then(res => {
      if(res.body.usernameTaken) {
        // eslint-disable-next-line
        throw Object.assign({}, previousErrors, { username: 'That username is taken'});
      }
    })
  } else if(field === 'email') {
    return su.post(`${API_HOST}/auth/signup/validate_email`)
    .send({ email: values.email })
    .set('Accept', 'application/json')
    .then(res => {
      if(res.body.emailTaken) {
        // eslint-disable-next-line
        throw Object.assign({}, previousErrors, { email: 'That email is already registerd'});
      }
    })
  } else {
    return new Promise((resolve, reject) => resolve())
  }
}
