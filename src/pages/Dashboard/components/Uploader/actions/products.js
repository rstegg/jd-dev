import su from 'superagent'
import shortid from 'shortid'

export const acceptUpload = accepted => ({
  type: 'ACCEPT_UPLOAD',
  payload: {
    accepted,
  }
})

export const rejectUpload = rejected => ({
  type: 'REJECT_UPLOAD',
  payload: {
    rejected
  }
})

export const toggleRenameCaseID = idx => ({
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

export const setNotes = (notes, idx) => ({
  type: 'SET_NOTES',
  payload: {
    notes,
    idx
  }
})

export const setShade = (shade, idx) => ({
  type: 'SET_SHADE',
  payload: {
    shade,
    idx
  }
})

export const setFinish = (finish, variant_id, idx) => ({
  type: 'SET_FINISH',
  payload: {
    finish,
    variant_id,
    idx
  }
})

export const setLayering = (layering, variant_id, idx) => ({
  type: 'SET_LAYERING',
  payload: {
    layering,
    variant_id,
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

export const clearUnits = (idx) => ({
  type: 'CLEAR_UNITS',
  payload: {
    idx
  }
})

export const setFillType = type => ({
  type: 'SET_FILL_TYPE',
  payload: {
    type
  }
})

export const setFillProduct = product => ({
  type: 'SET_FILL_PRODUCT',
  payload: {
    product
  }
})

export const setSelectedProducts = (selected) => ({
  type: 'SET_SELECTED_PRODUCTS',
  payload: {
    selected
  }
})

export const fetchTypes = () =>
  dispatch =>
    su.get('https://cdn.shopify.com/s/files/1/0935/7892/files/data.json?1609093586141030510')
    .then(res => res.body)
    .then(products => {
      const filtered = products.filter(product => !product.product.title.includes('max'))
      dispatch(populateTypes(filtered))
    })
    .catch(err => console.log(err))

export const populateTypes = (productTypes, idx) => ({
  type: 'POPULATE_TYPES',
  payload: {
    productTypes,
    idx
  }
})

export const populateNames = (collection, allProducts, idx) => ({
  type: 'POPULATE_NAMES',
  payload: {
    collection,
    allProducts,
    idx
  }
})

export const populateFillNames = (collection, allProducts) => ({
  type: 'POPULATE_FILL_NAMES',
  payload: {
    collection,
    allProducts
  }
})

export const validateForm = (products, token) =>
  dispatch => {
    const errors = products.map((product, i) => {
      let errs = []
      if (!product.type) {
        errs.push({ type: 'Required' })
      }
      if (!product.units) {
        errs.push({ units: 'Required' })
      }
      return errs
    })
    .filter(errs => errs.length)

    if (errors.length) {
      dispatch(notifyErrors(errors))
    } else {
      dispatch(addNewOrders(products))
    }
}

export const notifyErrors = errors => ({
  type: 'NOTIFY_ERRORS',
  payload: {
    errors
  }
})

export const sendCheckout = (products, token) =>
  dispatch => {
    dispatch(setButtonLoading(true))

  const orderProcess =
    products.map(product => {
    const uid = shortid()
    const savedOrder = {
      "id": uid,
      "name": product.name,
      "type": product.type,
      "notes": product.notes,
      "units": product.units
    }
    return su.put('http://localhost:5984/orders/' + uid)
      .set('Content-Type', 'application/json')
      .send(savedOrder)
    })

    Promise.all(orderProcess)
      .then(jsonArr => {
        jsonArr.map(json => {
          console.log(json.text)
        })

        window.location.href = '/#orders'
      })



  }

export const deleteProduct = idx => ({
  type: 'DELETE_PRODUCT',
  payload: {
    idx
  }
})

export const openNotification = () => ({
  type: 'OPEN_NOTIFICATION'
})

export const redirectToCheckout = url => ({
  type: 'REDIRECT_TO_CHECKOUT',
  payload: {
    url
  }
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

export const addNewOrders = orders => ({
  type: 'ADD_NEW_ORDERS',
  payload: {
    orders
  }
})
