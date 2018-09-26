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

export const addExtraNote = (note, order, user) =>
  dispatch => {
    dispatch({ type: 'ADD_EXTRA_NOTE', payload: { note, order, user } })
    su.put(`/api/v1/orders/${order.uid}/notes`)
      .accept('application/json')
      .set('Authorization', user.token)
      .send({ note })
      .then(res => dispatch(addExtraNoteSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const addExtraNoteSuccess = res => ({
  type: 'ADD_EXTRA_NOTE_SUCCESS',
  payload: {
    order: res.body.order
  }
})

export const addExtraScanFile = (file, order) => ({
  type: 'ADD_EXTRA_SCAN_FILE',
  payload: {
    file,
    order
  }
})

export const setOrderPrefs = (prefs, order, token) =>
  dispatch => {
    dispatch({ type: 'SET_ORDER_PREFS', payload: { prefs, order } })
    su.put(`/api/v1/orders/${order.uid}/prefs`)
      .accept('application/json')
      .set('Authorization', token)
      .send({ prefs })
      .then(res => dispatch(setOrderPrefsSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const setOrderPrefsSuccess = res => ({
  type: 'SET_ORDER_PREFS_SUCCESS',
  payload: {
    order: res.body.order
  }
})
