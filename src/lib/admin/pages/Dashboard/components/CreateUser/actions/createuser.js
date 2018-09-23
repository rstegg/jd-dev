import su from 'superagent'
import { SubmissionError } from 'redux-form'

export const onCreateUserSubmit = (user, token) =>
  dispatch => {
    dispatch({ type: 'CREATE_USER_SUBMIT' })
    return su.post('/api/v1/admin/users')
      .accept('application/json')
      .set('Authorization', token)
      .send({ user })
      .then(res => dispatch(onCreateUserSuccess(res)))
      .catch(err => {
        console.log(err);
        throw new SubmissionError({
          _error: 'CreateUser failed!'
        })
      })
}

export const onCreateUserSuccess = res =>
({
  type: 'CREATE_USER_SUCCESS',
  payload: {
    user: res.body.user
  }
})
