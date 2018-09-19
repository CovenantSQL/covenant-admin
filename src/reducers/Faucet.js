import * as ACTION_TYPES from '~/actions/types'

const initialState = {
  postRes: {},
  getRes: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.POST_FAUCET:
      return {
        ...state,
        postRes: action.data
      }
    case ACTION_TYPES.GET_FAUCET:
      return {
        ...state,
        getRes: action.data
      }
    default:
      return state
  }
}
