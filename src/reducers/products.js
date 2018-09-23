import uuid from 'uuid/v4'
import { mergeAll, uniq } from 'ramda'
import moment from 'moment'

const initialState = []

const upperUnits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
const lowerUnits = ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32']

const toggleScanUnit = (unit, arr) => arr.indexOf(unit) === -1 ? arr.concat(unit).sort((a,b) => Number(a) - Number(b))
  : [ ...arr.slice(0, arr.indexOf(unit)), ...arr.slice(arr.indexOf(unit) + 1) ]

const toggleScanModel = (model, state) => state.model.indexOf(model) === -1 ? state.model.concat(model).sort()
  : [ ...state.model.slice(0, state.model.indexOf(model)), ...state.model.slice(state.model.indexOf(model) + 1) ]

const toggleScanModelUnits = (model, state) => {
  if (model === 'top') {
    return state.model.includes('top') ? state.units.filter(x => !upperUnits.includes(x))
    : uniq(state.units.concat(upperUnits)).sort((a,b) => Number(a) - Number(b))
  }
  return state.model.includes('bottom') ? state.units.filter(x => !lowerUnits.includes(x))
  : uniq(state.units.concat(lowerUnits)).sort((a,b) => Number(a) - Number(b))
}


const defaultPrefs = {
  contact: '-0.03 mm',
  occlusion: '-0.30 mm OUT of Occlusion',
  pontic: 'Modified Ridge Lap',
  linerSpacer: '0.030 mm - 30 Microns'
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ACCEPT_STL':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name, preview: action.payload.stl, uid: uuid(),
          name: action.payload.accepted.name.split('.').slice(0,-1).join(''), model: [], dueDate: moment(), dueTime: moment(),  }
      ]))
    case 'ACCEPT_XML':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name,
          uid: uuid(), name: action.payload.accepted.name.split('.').slice(0,-1).join(''), model: [], dueDate: moment(), dueTime: moment(), },
        action.payload.xml
      ]))
    case 'ACCEPT_ZIP':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name, uid: uuid(),
          name: action.payload.accepted.name.split('.').slice(0,-1).join(''), model: [], dueDate: moment(), dueTime: moment(), },
        action.payload.zip
       ]))
    case 'ACCEPT_GENERIC':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name,
          name: action.payload.accepted.name.split('.').slice(0,-1).join(''), model: [], dueDate: moment(), dueTime: moment(), }
        ]))
    case 'SET_TYPE':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], type: action.payload.type, isValid: state[action.payload.idx].units && state[action.payload.idx].units.length },
              ...state.slice(action.payload.idx+1) ]
    case 'TOGGLE_RENAME_CASE_ID':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], renameScanID: !state[action.payload.idx].renameScanID || false },
              ...state.slice(action.payload.idx+1) ]
    case 'EDIT_NAME':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], unsavedName: action.payload.name },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_NAME':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], name: action.payload.name, renameScanID: false },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_TIME':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], dueTime: action.payload.time },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_DATE':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], dueDate: action.payload.date },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_PATIENT':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], patient: action.payload.patient },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_NOTES':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], notes: action.payload.notes },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_MODEL':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], model: toggleScanModel(action.payload.model, state[action.payload.idx]), units: toggleScanModelUnits(action.payload.model, state[action.payload.idx]) },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_UNITS':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], units: toggleScanUnit(action.payload.units, state[action.payload.idx].units), model: [], isValid: toggleScanUnit(action.payload.units, state[action.payload.idx].units).length && state[action.payload.idx].type },
              ...state.slice(action.payload.idx+1) ]
    case 'CLEAR_UNITS':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], units: [], model: [], isValid: false },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_PROGRESS':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], progress: action.payload.progress },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_PREFERENCE':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], [action.payload.key]: action.payload.value },
              ...state.slice(action.payload.idx+1) ]
    case 'DELETE_PRODUCT':
      const uids = state.map(product => product.uid)
      const idx = uids.indexOf(action.payload.uid)
      return [ ...state.slice(0, idx),
              ...state.slice(idx+1) ]
    case 'CREATE_ORDERS_SUCCESS':
    case 'LOGOUT_SUBMIT':
      return initialState
    default:
      return state
  }
}
