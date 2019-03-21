import * as AT from './types'
import _get from 'lodash/get'
import { notification } from 'antd'

import Covenant from '~/utils/api/Covenant'
import t from '~/utils/locales'

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

export const applyToken = ({ account, email }) => (dispatch) => {
  return Covenant.ApplyToken.post({ account, email })
    .then(({ data }) => {
      dispatch({
        type: AT.APPLY_TOKEN,
        account,
        email,
        data
      })
    })
    .catch(err => handleNetworkError(err))
}

export const getAccountBalance = ({ account }) => (dispatch) => {
  return Covenant.AccountBalance.get({ account })
    .then(({ data }) => {
      console.log(data)
      const balance = data.data.balance
      dispatch({
        type: AT.GET_ACCOUNT_BALANCE,
        balance
      })
    })
    .catch(err => handleNetworkError(err))
}

export const getDbBalance = ({ account, db }) => (dispatch) => {
  return Covenant.DbBlance.get({ account, db })
    .then(({ data }) => {
      dispatch({
        type: AT.GET_DB_BALANCE,
        data
      })
    })
    .catch(err => handleNetworkError(err))
}

export const createDB = ({ account }) => (dispatch) => {
  dispatch({ type: AT.SET_LOADING, key: 'createDB' })
  return Covenant.CreateDB.post({ account })
    .then(({ data }) => {
      console.log('////////////////', data)
      dispatch({
        type: AT.CREATE_DB,
        data: data.data
      })

      dispatch({ type: AT.RM_LOADING, key: 'createDB' })
    })
    .catch(err => handleNetworkError(err))
}
