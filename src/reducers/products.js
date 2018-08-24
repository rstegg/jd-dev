const initialState = []

const toggleCaseUnit = (unit, arr) => arr.indexOf(unit) === -1 ? arr.concat(unit)
  : [ ...arr.slice(0, arr.indexOf(unit)), ...arr.slice(arr.indexOf(unit) + 1) ]

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ACCEPT_STL':
      return state.concat({ file: action.payload.accepted, ...action.payload.accepted, name: action.payload.accepted.name.slice(0,-4), units: [] })
    case 'ACCEPT_XML':
      return state.concat({ file: action.payload.accepted, ...action.payload.accepted, name: action.payload.accepted.name.slice(0,-4), units: [] })
    case 'ACCEPT_ZIP':
      return state.concat({ file: action.payload.accepted, ...action.payload.accepted, name: action.payload.accepted.name.slice(0,-4), units: [] })
    case 'ACCEPT_GENERIC':
      return state.concat({ file: action.payload.accepted, ...action.payload.accepted, name: action.payload.accepted.name.slice(0,-4), units: [] })
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
      return [ ...state.slice(0, action.payload.idx),
              ...state.slice(action.payload.idx+1) ]
    case 'CREATE_ORDERS_SUCCESS':
      return initialState
    default:
      return state
  }
}
