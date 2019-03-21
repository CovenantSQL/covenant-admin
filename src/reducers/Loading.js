import * as AT from '~/actions/types'

const initialState = {
  createDB: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.SET_LOADING:
      return {
        ...state,
        [action.key]: true
      }
    case AT.RM_LOADING:
      return {
        ...state,
        [action.key]: false
      }
    default:
      return state
  }
}
