import su from 'superagent'

export const fetchUsersSuccess = res => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: {
    users: res.body.users
  }
})

export const fetchUsers = token =>
  dispatch => {
    su.get('/api/v1/admin/users')
      .accept('application/json')
      .set('Authorization', token)
      .then(res => dispatch(fetchUsersSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const banUser = (user, token) =>
  dispatch => {
    dispatch({ type: 'BAN_USER', payload: { user } })
    su.delete('/api/v1/admin/users')
      .accept('application/json')
      .set('Authorization', token)
      .send({ user })
      .then(res => dispatch(banUserSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const banUserSuccess = res => ({
  type: 'BAN_USER_SUCCESS',
  payload: {
    users: res.body.users
  }
})

export const unbanUser = (user, token) =>
  dispatch => {
    dispatch({ type: 'UNBAN_USER', payload: { user } })
    su.post('/api/v1/admin/users/unban')
      .accept('application/json')
      .set('Authorization', token)
      .send({ user })
      .then(res => dispatch(unbanUserSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const unbanUserSuccess = res => ({
  type: 'UNBAN_USER_SUCCESS',
  payload: {
    users: res.body.users
  }
})
