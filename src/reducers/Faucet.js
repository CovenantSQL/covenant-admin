import * as ACTION_TYPES from '~/actions/types'
import { getWalletAddress } from '~/utils/localStorage'

const initialState = {
  account: {
    address: getWalletAddress() || '',
    email: '',
    balance: 0
  },
  postRes: {},
  getRes: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.APPLY_TOKEN:
      return {
        ...state,
        postRes: action.data
      }
    case ACTION_TYPES.GET_ACCOUNT_BALANCE:
      return {
        ...state,
        account: {
          ...state.account,
          balance: action.balance
        }
      }
    default:
      return state
  }
}
