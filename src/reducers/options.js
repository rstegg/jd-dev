import { map } from 'ramda'
import { IGNORED_DATA } from '../utils/constants'

const initialState = []

const uiValueMapping = type => map(x => ({ label: x, value: x }), type)
const filterFinishes = finishes =>
  finishes.filter(a => IGNORED_DATA.filter(ignored => ignored.test(a)).length === 0)
  .filter(a => !!a)
  .map(f => {
    switch(f) {
      case 'NoFinishing':
        return 'No Finishing';
      case 'StainandGlazed':
        return 'Stain and Glazed';
      case 'Crystallizeit':
        return 'Crystallize it';
      case 'SenditPurple':
        return 'Send it Purple';
      default:
        return '';
    }
  })

const filterNames = (collection, allProducts) =>
  allProducts
  .filter(product => product.collection === collection)
  .map(product => ({ label: product.product.title, value: product.product.title, id: product.product.id, variants: product.product.variants[0].id, ...product }))

export default (state=initialState, action) => {
  switch(action.type) {
    case 'ACCEPT_STL':
      return [ ...state, { ...action.payload.accepted, renameCaseID: false } ]
    case 'POPULATE_NAMES':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], productNames: filterNames(action.payload.collection, action.payload.allProducts) },
              ...state.slice(action.payload.idx+1) ]
    case 'POPULATE_SHADES':
      return [ ...state.slice(0, action.payload.idx),
              Object.assign({}, state[action.payload.idx], { productShades: uiValueMapping(action.payload.productShades) }),
              ...state.slice(action.payload.idx+1) ]
    case 'POPULATE_FINISHES':
      return [ ...state.slice(0, action.payload.idx),
              Object.assign({}, state[action.payload.idx], { productFinishes: uiValueMapping(filterFinishes(action.payload.productFinishes)) }),
              ...state.slice(action.payload.idx+1) ]
    case 'POPULATE_LAYERING':
      return [ ...state.slice(0, action.payload.idx),
              Object.assign({}, state[action.payload.idx], { productLayering: uiValueMapping(action.payload.productLayering) }),
              ...state.slice(action.payload.idx+1) ]
    case 'SET_TYPE':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], productNames: undefined, productShades: undefined, productFinishes: undefined, productLayering: undefined },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_PRODUCT':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], productShades: uiValueMapping(action.payload.product.shades), productFinishes: uiValueMapping(filterFinishes(action.payload.product.finishing)), productLayering: undefined },
              ...state.slice(action.payload.idx+1) ]
    case 'DELETE_PRODUCT':
      return [ ...state.slice(0, action.payload.idx),
              ...state.slice(action.payload.idx+1) ]
    default:
      return state
  }
}
