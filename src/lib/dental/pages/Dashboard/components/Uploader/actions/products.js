import su from 'superagent'
import { length, flatten } from 'ramda'

export const acceptStl = (accepted, stl) => ({
  type: 'ACCEPT_STL',
  payload: {
    accepted,
    stl
  }
})

export const acceptXml = (accepted, xml) => ({
  type: 'ACCEPT_XML',
  payload: {
    accepted,
    xml
  }
})

export const acceptZip = (accepted, zip) => ({
  type: 'ACCEPT_ZIP',
  payload: {
    accepted,
    zip
  }
})

export const acceptGeneric = accepted => ({
  type: 'ACCEPT_GENERIC',
  payload: {
    accepted,
  }
})

export const rejectUpload = rejected => ({
  type: 'REJECT_STL',
  payload: {
    rejected
  }
})

export const toggleRenameScanID = idx => ({
  type: 'TOGGLE_RENAME_CASE_ID',
  payload: {
    idx
  }
})

export const setType = (type, idx) => ({
  type: 'SET_TYPE',
  payload: {
    type,
    idx
  }
})

export const editName = (name, idx) => ({
  type: 'EDIT_NAME',
  payload: {
    name,
    idx
  }
})

export const setName = (name, idx) => ({
  type: 'SET_NAME',
  payload: {
    name,
    idx
  }
})

export const setDueTime = (time, idx) => ({
  type: 'SET_TIME',
  payload: {
    time,
    idx
  }
})

export const setDueDate = (date, idx) => ({
  type: 'SET_DATE',
  payload: {
    date,
    idx
  }
})

export const setNotes = (notes, idx) => ({
  type: 'SET_NOTES',
  payload: {
    notes,
    idx
  }
})

export const setModel = (model, idx) => ({
  type: 'SET_MODEL',
  payload: {
    model,
    idx
  }
})

export const setUnits = (units, idx) => ({
  type: 'SET_UNITS',
  payload: {
    units,
    idx
  }
})

export const setPreference = (key, value, idx) => ({
  type: 'SET_PREFERENCE',
  payload: {
    key,
    value,
    idx
  }
})

export const clearUnits = (idx) => ({
  type: 'CLEAR_UNITS',
  payload: {
    idx
  }
})

export const validateForm = (products, token) =>
  dispatch => {
    const errors = products.map((product, i) => {
      let errs = {}
      if (!product.type) {
        errs.type = 'Required'
      }
      if (!length(product.units)) {
        errs.units = 'Required'
      }
      return errs
    })


    const errLengths = errors
      .filter(errs => length(Object.keys(errs)))

    if (errLengths.length) {
      dispatch(notifyErrors(errors))
    } else {
      dispatch(sendOrders(products, token))
    }
}

export const notifyErrors = errors => ({
  type: 'NOTIFY_ERRORS',
  payload: {
    errors
  }
})

export const sendOrders = (products, token) =>
  dispatch => {
    dispatch(setButtonLoading(true))
    dispatch({ type: 'SEND_ORDERS', orders: products })

    const files = products.map(product => product.file )

    su.post('/api/v1/upload/orders')
      .set('Authorization', token)
      .field('file', files)
      .then(({ body }) => {
        const fileNames = body.files.map(file => file.originalname)
        const orders = products.reduce((acc, product, arr, i) => {
          if (fileNames.indexOf(product.filename) !== -1) {
            const idx = fileNames.indexOf(product.filename)
            const file = body.files[idx]
            if (file) {
              return acc.concat({ ...product, scanFileUrls: file.location })
            }
            if (body.files && body.files.length) {
              return acc.concat({ ...product, scanFileUrls: body.files[0] })
            }
            return acc.concat(product)
          }
          return acc
        }, [])
        return su.post('/api/v1/orders')
          .set('Authorization', token)
          .send({ orders })
      })
      .then(res => dispatch(createOrdersSuccess(res.body.orders)))
      .catch(err => {
        dispatch(setButtonLoading(false))
        notifyErrors(err)
      })
      .catch(console.error)


  }


export const createOrdersSuccess = orders => ({
  type: 'CREATE_ORDERS_SUCCESS',
  payload: {
    orders
  }
})

export const redirectingOrders = () => ({
  type: 'REDIRECTING_TO_ORDERS'
})



export const deleteProduct = uid => ({
  type: 'DELETE_PRODUCT',
  payload: {
    uid
  }
})

export const openNotification = () => ({
  type: 'OPEN_NOTIFICATION'
})

export const redirectToOrders = () => ({
  type: 'REDIRECT_TO_ORDERS',
})

export const setButtonLoading = isLoading => ({
  type: 'SET_BUTTON_LOADING',
  payload: {
    isLoading,
  }
})

export const setProgress = (progress, idx) => ({
  type: 'SET_PROGRESS',
  payload: {
    progress,
    idx
  }
})
