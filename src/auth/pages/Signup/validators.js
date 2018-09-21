import su from 'superagent'
const API_HOST = '/api/v1'

// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
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

export const asyncValidate = (values, dispatch, props, field) => {
  const previousErrors = props.asyncErrors;
  if(field === 'email') {
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
