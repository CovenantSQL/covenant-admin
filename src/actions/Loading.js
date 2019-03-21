import * as AT from './types'

export const setLoading = (key) => (dispatch) => {
  dispatch({ type: AT.SET_LOADING, key })
}

export const rmLoading = (key) => (dispatch) => {
  dispatch({ type: AT.RM_LOADING, key })
}
