import uuid from 'uuid/v4'
import { mergeAll } from 'ramda'

const initialState = []

const toggleCaseUnit = (unit, arr) => arr.indexOf(unit) === -1 ? arr.concat(unit)
  : [ ...arr.slice(0, arr.indexOf(unit)), ...arr.slice(arr.indexOf(unit) + 1) ]

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
          name: action.payload.accepted.name.split('.').slice(0,-1).join(''), units: [], }
      ]))
    case 'ACCEPT_XML':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name,
          uid: uuid(), name: action.payload.accepted.name.split('.').slice(0,-1).join(''), units: [] },
        action.payload.jsonFromXML
      ]))
    case 'ACCEPT_ZIP':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name, uid: uuid(), name: action.payload.accepted.name.split('.').slice(0,-1).join(''), units: [] },
        action.payload.jsonFromXML
       ]))
    case 'ACCEPT_GENERIC':
      return state.concat(mergeAll([
        defaultPrefs,
        { file: action.payload.accepted, ...action.payload.accepted, filename: action.payload.accepted.name,
          name: action.payload.accepted.name.split('.').slice(0,-1).join(''), units: [] }
        ]))
    case 'SET_TYPE':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], type: action.payload.type, product: undefined, id: undefined, variant_id: undefined, shade: undefined, finish: undefined, layering: undefined },
              ...state.slice(action.payload.idx+1) ]
    case 'TOGGLE_RENAME_CASE_ID':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], renameCaseID: !state[action.payload.idx].renameCaseID || false },
              ...state.slice(action.payload.idx+1) ]
    case 'EDIT_NAME':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], unsavedName: action.payload.name },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_NAME':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], name: action.payload.name, renameCaseID: false },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_TIME':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], time: action.payload.time },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_DATE':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], date: action.payload.date },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_PATIENT':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], patient: action.payload.patient },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_NOTES':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], notes: action.payload.notes },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_UNITS':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], units: toggleCaseUnit(action.payload.units, state[action.payload.idx].units) },
              ...state.slice(action.payload.idx+1) ]
    case 'CLEAR_UNITS':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], units: [] },
              ...state.slice(action.payload.idx+1) ]
    case 'SET_PROGRESS':
      return [ ...state.slice(0, action.payload.idx),
              { ...state[action.payload.idx], progress: action.payload.progress },
              ...state.slice(action.payload.idx+1) ]
    case 'DELETE_PRODUCT':
      console.log(state);
      const uids = state.map(product => product.uid)
      const idx = uids.indexOf(action.payload.uid)
      console.log(uids);
      return [ ...state.slice(0, idx),
              ...state.slice(idx+1) ]
    case 'CREATE_ORDERS_SUCCESS':
      return initialState
    default:
      return state
  }
}
