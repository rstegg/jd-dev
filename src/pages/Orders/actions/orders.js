import su from 'superagent'

export const fetchOrdersSuccess = orders => ({
  type: 'FETCH_ORDERS_SUCCESS',
  payload: {
    orders
  }
})

export const fetchOrders = () =>
  dispatch => {
    //const token = document.cookie
    su.get('/api/v1/orders')
      //.set('Authorization', token)
      .then(docs => {
        const json = JSON.parse(docs.text)
        const orders = json.rows.map(row => row.doc)
        dispatch(
          fetchOrdersSuccess(orders)
        )
      })
      .catch(err => {
        console.error(err);
      })
  }
