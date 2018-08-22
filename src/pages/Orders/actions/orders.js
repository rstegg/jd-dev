import su from 'superagent'

export const fetchOrdersSuccess = res => ({
  type: 'FETCH_ORDERS_SUCCESS',
  payload: {
    orders: res.body.orders
  }
})

export const fetchOrders = token =>
  dispatch => {
    su.get('/api/v1/orders')
      .accept('application/json')
      .set('Authorization', 'JWT ' + token)
      .then(res => dispatch(fetchOrdersSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }
