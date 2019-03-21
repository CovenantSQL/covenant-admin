import * as AT from '~/actions/types'
import _uniqBy from 'lodash/uniqBy'

const initialState = {
  account: {
    address: '',
    email: '',
    balance: 0
  },
  db: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.APPLY_TOKEN:
      return {
        ...state,
        account: {
          ...state.account,
          address: action.account,
          email: action.email
        }
      }
    case AT.GET_ACCOUNT_BALANCE:
      return {
        ...state,
        account: {
          ...state.account,
          balance: action.balance
        }
      }
    case AT.CREATE_DB:
      return {
        ...state,
        db: _uniqBy(state.db.push(action.data), 'db')
      }
    default:
      return state
  }
}
