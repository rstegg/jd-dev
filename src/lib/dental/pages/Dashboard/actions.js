import su from 'superagent'

export const fetchDashboardSuccess = res => ({
  type: 'FETCH_DASHBOARD_SUCCESS',
  payload: {
    processedOrders: res.body.processedOrders,
    completedOrders: res.body.completedOrders,
    canceledOrders: res.body.canceledOrders,
    newOrders: res.body.newOrders,
  }
})

export const fetchDashboard = token =>
  dispatch => {
    su.get('/api/v1/orders/dashboard')
      .accept('application/json')
      .set('Authorization', token)
      .then(res => dispatch(fetchDashboardSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }


export const redirectToOrders = () => ({
  type: 'REDIRECTING_TO_ORDERS',
})
