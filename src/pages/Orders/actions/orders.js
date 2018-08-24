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
      .set('Authorization', token)
      .then(res => dispatch(fetchOrdersSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const cancelOrder = (order, token) =>
  dispatch => {
    console.log(token);
    dispatch({ type: 'CANCEL_ORDER', payload: { order } })
    su.delete('/api/v1/orders')
      .accept('application/json')
      .set('Authorization', token)
      .send({ order })
      .then(res => dispatch(cancelOrdersSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const cancelOrdersSuccess = res => ({
  type: 'CANCEL_ORDERS_SUCCESS',
  payload: {
    orders: res.body.orders
  }
})
