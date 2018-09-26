import su from 'superagent'
import { flatten } from 'ramda'

export const fetchCasesSuccess = res => ({
  type: 'FETCH_CASES_SUCCESS',
  payload: {
    cases: res.body.orders
  }
})

export const fetchCases = token =>
  dispatch => {
    su.get('/api/v1/orders/design')
      .accept('application/json')
      .set('Authorization', token)
      .then(res => dispatch(fetchCasesSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const reassignOrder = (order, token) =>
  dispatch => {
    dispatch({ type: 'REASSIGN_ORDER', payload: { order } })
    su.post('/api/v1/orders/reassign')
      .accept('application/json')
      .set('Authorization', token)
      .send({ order })
      .then(res => dispatch(reassignOrderSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const reassignOrderSuccess = res => ({
  type: 'REASSIGN_ORDER_SUCCESS',
  payload: {
    cases: res.body.cases
  }
})

export const addDesignNote = (note, order, token) =>
  dispatch => {
    dispatch({ type: 'ADD_DESIGN_NOTE', payload: { note, order } })
    su.put(`/api/v1/orders/${order.uid}/notes`)
      .accept('application/json')
      .set('Authorization', token)
      .send({ note })
      .then(res => dispatch(addDesignNoteSuccess(res)))
      .catch(err => {
        console.error(err);
      })
  }

export const addDesignNoteSuccess = res => ({
  type: 'ADD_DESIGN_NOTE_SUCCESS',
  payload: {
    c: res.body.c
  }
})

export const addDesignFile = (file, order) => ({
  type: 'ADD_DESIGN_FILE',
  payload: {
    file,
    order
  }
})
