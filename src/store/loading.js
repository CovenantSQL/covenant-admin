// types
export const SET_LOADING = 'loading/SET_LOADING'
export const RM_LOADING = 'loading/RM_LOADING'

// state
const initialState = {
  createDB: false,
  privatizeDB: false,
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        [action.key]: true
      }
    case RM_LOADING:
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
  dispatch({ type: SET_LOADING, key })
}

export const rmLoading = (key) => (dispatch) => {
  dispatch({ type: RM_LOADING, key })
}
