import su from 'superagent'
import base64 from 'base64-url'
import shortid from 'shortid'
import { find, propEq } from 'ramda'

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

export const applyToAll = (fillProduct, idxs) =>
  dispatch => {
    idxs.map((idx) => {
      if (fillProduct.type) {
        dispatch(setType(fillProduct.type, idx))
      }
      if (fillProduct.notes) {
        dispatch(setNotes(fillProduct.notes, idx))
      }
    })
  }

export const fetchTypes = () =>
  dispatch =>
    su.get('https://cdn.shopify.com/s/files/1/0935/7892/files/data.json?1609093586141030510')
    .then(res => res.body)
    .then(products => {
      const filtered = products.filter(product => !product.product.title.includes('max'))
      dispatch(populateTypes(filtered))
    })
    .catch(err => console.log(err))

// export const fetchTypes = () =>
//   dispatch =>
//     import('./data.json').then(products => {
//       dispatch(populateTypes(products))
//     })

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

export const validateForm = (products, options) =>
  dispatch => {
    const errors = products.map((product, i) => {
      let errs = []
      if (!product.shade && options[i].productShades && options[i].productShades.length) {
        errs.push({ shade: 'Required' })
      }
      if (!product.finish && options[i].productFinishes && options[i].productFinishes.length) {
        errs.push({ finish: 'Required' })
      }
      if (!product.product) {
        errs.push({ product: 'Required' })
      }
      if (!product.type) {
        errs.push({ type: 'Required' })
      }
      if (!product.units || product.units <= 0) {
        errs.push({ units: 'Required' })
      }
      return errs
    })
    .filter(errs => errs.length)

    if (errors.length) {
      dispatch(notifyErrors(errors))
    } else {
      dispatch(sendCheckout(products))
    }
}

export const notifyErrors = errors => ({
  type: 'NOTIFY_ERRORS',
  payload: {
    errors
  }
})

export const sendCheckout = products =>
  dispatch => {
    dispatch(setButtonLoading(true))
    const line_items = products.reduce((line_prods, product) => {
      let properties = { 'Case ID': product.name }

      if (product.shade) {
        properties = { 'Case ID': product.name , 'Shade': product.shade }
      }

      if (product.finish && !product.shade) {
        properties = { 'Case ID': product.name, 'Finishing': product.finish }
      }

      if (product.finish && product.shade) {
        properties = { 'Case ID': product.name, 'Shade': product.shade, 'Finishing': product.finish }
      }

      const agId = 'antigravity_' + shortid.generate().replace(/-/g, '')

      let arr = [{
        variantId: product.variant_id,
        quantity: product.units || 1,
        stl: product.stl,
        name: product.name,
        caseID: product.name,
        shade: product.shade,
        finishing: product.finish,
        agId,
        properties
      }]

      if (product.finish_variant_id) {
        arr = arr.concat([{
          variantId: product.finish_variant_id,
          quantity: product.units || 1,
          agId
        }])
      }

      if (product.layering_variant_id) {
        arr = arr.concat([{
          variantId: product.layering_variant_id,
          quantity: product.units || 1,
          agId
        }])
      }

      return line_prods.concat(arr)
    }, [])

    const requests = line_items.map((line_item, idx) => {
      const variant_id = base64.decode(line_item.variantId).split('/').slice(-1)[0]
      const quantity = line_item.quantity
      const caseID = line_item.caseID || ''
      const shade = line_item.shade || ''
      const finishing = line_item.finishing || ''
      const ag_id = line_item.agId
      if (line_item.stl) {
        return su.post('https://www.alienmilling.com/cart/add.js')
        .field({
          id: variant_id,
          quantity,
          'properties[Case ID]': caseID,
          'properties[Shade]': shade,
          'properties[Finishing]': finishing,
          'properties[_master_builder]': 1,
          'properties[_builder_id]': ag_id
        })
        .attach('properties[Upload STL]', line_item.stl)
        .on('progress', event => {
          const product = find(propEq('stl', line_item.stl), products)
          dispatch(setProgress(event.percent, products.indexOf(product)))
        })
      } else {
        return su.post('https://www.alienmilling.com/cart/add.js')
        .field({
          id: variant_id,
          quantity,
          'properties[_bold_ratio]': 1,
          'properties[_builder_id]': ag_id,
        })
      }
    })

    const requestChain = requests.reduce((prev, cur) => prev.then(() => Promise.resolve(cur)), Promise.resolve())

    requestChain
      .then(res => {
        dispatch(redirectToCheckout('https://www.alienmilling.com/cart'))
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
