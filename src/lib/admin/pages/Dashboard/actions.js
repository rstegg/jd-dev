import su from 'superagent'

export const fetchAdminDashboardSuccess = res => ({
  type: 'FETCH_ADMIN_DASHBOARD_SUCCESS',
  payload: {
    userCount: res.body.userCount,
    orderCount: res.body.orderCount,
    designerCount: res.body.designerCount,
    finishedOrderCount: res.body.finishedOrderCount,
  }
})

export const fetchAdminDashboard = token =>
  dispatch => {
    su.get('/api/v1/admin/counts')
      .accept('application/json')
      .set('Authorization', token)
      .then(res => dispatch(fetchAdminDashboardSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const resetCreateUser = () =>
({
  type: 'RESET_CREATE_USER'
})
