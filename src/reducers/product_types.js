import { map, uniq } from 'ramda'

const initialState = []

const collectionMapping = type => uniq(map(x => ({
  label: x.collection, value: x.collection
}), type))

export default (state=initialState, action) => {
  switch(action.type) {
    case 'POPULATE_TYPES':
      return collectionMapping(action.payload.productTypes)
    default:
      return state
  }
}
