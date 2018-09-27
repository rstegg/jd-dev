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

export const addExtraNoteAdmin = (note, order, user) =>
  dispatch => {
    dispatch({ type: 'ADMIN_ADD_EXTRA_NOTE', payload: { note, order, user } })
    su.put(`/api/v1/admin/orders/${order.uid}/notes`)
      .accept('application/json')
      .set('Authorization', user.token)
      .send({ note })
      .then(res => dispatch(addExtraNoteAdminSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const addExtraNoteAdminSuccess = res => ({
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

export const addExtraScanFileAdmin = (file, order) => ({
  type: 'ADMIN_ADD_EXTRA_SCAN_FILE',
  payload: {
    order,
    file
  }
})

export const addDesignFileAdmin = (file, order) => ({
  type: 'ADMIN_ADD_DESIGN_FILE',
  payload: {
    order,
    file
  }
})

export const reassignOrderAdmin = (order, token) =>
  dispatch => {
    dispatch({ type: 'REASSIGN_ORDER_ADMIN', payload: { order } })
    return su.post('/api/v1/admin/orders/reassign')
    .accept('application/json')
    .set('Authorization', token)
    .send({ order })
    .then(res => dispatch(reassignOrderAdminSuccess(res)))
    .catch(console.error)
  }

export const reassignOrderAdminSuccess = res => ({
  type: 'REASSIGN_ORDER_ADMIN_SUCCESS',
  payload: {
    order: res.body.order
  }
})
