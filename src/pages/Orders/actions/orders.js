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
      .then(res => {
        dispatch(fetchOrdersSuccess(res))
        const orders = res.body.orders
        const safeOrders = orders.filter(o => o.designers && o.designers.length)
        const designers = flatten(safeOrders.map(o => o.designers && o.designers.map(designer => ({ ...designer, case: o.name, caseUID: o.uid }))))
        designers.map(designer => {
          dispatch(joinChatThread(designer.caseUID, token))
        })
      })
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


export const joinChatThread = (threadId, token) =>
({
  type: 'WS/JOIN_THREAD',
  payload: {
    threadId,
    token
  }
})
