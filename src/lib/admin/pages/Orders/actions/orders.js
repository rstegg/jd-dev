import su from 'superagent'

export const fetchOrdersSuccess = res => ({
  type: 'ADMIN_FETCH_ORDERS_SUCCESS',
  payload: {
    orders: res.body.orders
  }
})

export const fetchOrders = token =>
  dispatch => {
    su.get('/api/v1/admin/orders')
      .accept('application/json')
      .set('Authorization', token)
      .then(res => dispatch(fetchOrdersSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const cancelOrder = (order, token) =>
  dispatch => {
    dispatch({ type: 'ADMIN_CANCEL_ORDER', payload: { order } })
    su.delete('/api/v1/admin/orders')
      .accept('application/json')
      .set('Authorization', token)
      .send({ order })
      .then(res => dispatch(cancelOrdersSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const cancelOrdersSuccess = res => ({
  type: 'ADMIN_CANCEL_ORDERS_SUCCESS',
  payload: {
    orders: res.body.orders
  }
})

export const addExtraNote = (note, order, token) =>
  dispatch => {
    dispatch({ type: 'ADMIN_ADD_EXTRA_NOTE', payload: { note, order } })
    su.put(`/api/v1/orders/${order.uid}/notes`)
      .accept('application/json')
      .set('Authorization', token)
      .send({ note })
      .then(res => dispatch(addExtraNoteSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const addExtraNoteSuccess = res => ({
  type: 'ADMIN_ADD_EXTRA_NOTE_SUCCESS',
  payload: {
    order: res.body.order
  }
})

export const addExtraScanFile = (file, order) => ({
  type: 'ADMIN_ADD_EXTRA_SCAN_FILE',
  payload: {
    file,
    order
  }
})

export const setOrderPrefs = (prefs, order, token) =>
  dispatch => {
    dispatch({ type: 'ADMIN_SET_ORDER_PREFS', payload: { prefs, order } })
    su.put(`/api/v1/admin/orders/${order.uid}/prefs`)
      .accept('application/json')
      .set('Authorization', token)
      .send({ prefs })
      .then(res => dispatch(setOrderPrefsSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const setOrderPrefsSuccess = res => ({
  type: 'ADMIN_SET_ORDER_PREFS_SUCCESS',
  payload: {
    order: res.body.order
  }
})
