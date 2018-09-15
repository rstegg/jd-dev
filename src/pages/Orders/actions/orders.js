import su from 'superagent'
import { flatten } from 'ramda'

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

export const addExtraNote = (note, order, token) =>
  dispatch => {
    dispatch({ type: 'ADD_EXTRA_NOTE', payload: { note, order } })
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
