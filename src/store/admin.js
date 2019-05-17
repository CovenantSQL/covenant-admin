import AdminAPI from '~/utils/api/Admin'
import t from '~/utils/locales'

import _get from 'lodash/get'
import { notification } from 'antd'

// types
// import { SET_LOADING, RM_LOADING } from './loading'
const CREATE_WALLET = 'admin/CREATE_WALLET'

// state
const initialState = {
  account: ''
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WALLET:
      return {
        ...state,
        account: action.account
      }
    default:
      return state
  }
}

// actions
const handleNetworkError = (err) => {
  console.error(err)
  const status = _get(err, 'status', '')

  notification.error({
    message: status !== '' ? t(status) : t('msg_netword_err'),
    description: '',
    duration: 0
  })
  return err
}

export const createWallet = ({ password }) => (dispatch) => {
  return AdminAPI.CreateWallet.post({ password })
    .then(({ data }) => {
      const { account, key } = data.data
      // only store account in redux
      dispatch({ type: CREATE_WALLET, account })
      return { account, key }
    })
    .catch(err => handleNetworkError(err))
}
