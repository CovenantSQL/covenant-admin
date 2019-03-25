import * as AT from '~/actions/types'

// state
const initialState = {
  createDB: false
}

// reducers
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

// actions
export const setLoading = (key) => (dispatch) => {
  dispatch({ type: AT.SET_LOADING, key })
}

export const rmLoading = (key) => (dispatch) => {
  dispatch({ type: AT.RM_LOADING, key })
}
