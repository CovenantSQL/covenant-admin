import Covenant from '~/utils/api/Covenant'
import t from '~/utils/locales'

import _get from 'lodash/get'
import { notification } from 'antd'

// types
import { SET_LOADING, RM_LOADING } from './loading'
const APPLY_TOKEN = 'covenant/APPLY_TOKEN'
const GET_ACCOUNT_BALANCE = 'covenant/GET_ACCOUNT_BALANCE'
const GET_DB_BALANCE = 'covenant/GET_DB_BALANCE'
const CREATE_DB = 'covenant/CREATE_DB'
const PRIVATIZE_DB = 'covenant/PRIVATIZE_DB'
const SET_ADMINER_DBID = 'covenant/SET_ADMINER_DBID'

// state
const initialState = {
  account: {
    address: '',
    email: '',
    balance: 0
  },
  dbs: [],
  adminer: { selected: '' },
  privatization: {}
}

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case APPLY_TOKEN:
      return {
        ...state,
        account: {
          ...state.account,
          address: action.account,
          email: action.email
        }
      }
    case GET_ACCOUNT_BALANCE:
      return {
        ...state,
        account: {
          ...state.account,
          balance: action.balance
        }
      }
    case CREATE_DB:
      return {
        ...state,
        dbs: action.dbs
      }
    case PRIVATIZE_DB:
      return {
        ...state,
        privatization: {
          ...state.privatization,
          [action.db]: action.tx
        }
      }
    case SET_ADMINER_DBID:
      return {
        ...state,
        adminer: {
          ...state.adminer,
          selected: action.dbid
        }
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

export const applyToken = ({ account, email }) => (dispatch) => {
  return Covenant.ApplyToken.post({ account, email })
    .then(({ data }) => {
      dispatch({
        type: APPLY_TOKEN,
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
      const balance = data.data.balance
      dispatch({
        type: GET_ACCOUNT_BALANCE,
        balance
      })
    })
    .catch(err => handleNetworkError(err))
}

export const getDbBalance = ({ account, db }) => (dispatch) => {
  return Covenant.DbBlance.get({ account, db })
    .then(({ data }) => {
      dispatch({
        type: GET_DB_BALANCE,
        data
      })
    })
    .catch(err => handleNetworkError(err))
}

export const createDB = ({ account }) => (dispatch, getState) => {
  const currentDB = getState().cql.dbs
  dispatch({ type: SET_LOADING, key: 'createDB' })
  return Covenant.CreateDB.post({ account })
    .then(({ data }) => {
      let dbs = currentDB.slice(0, currentDB.length)
      dbs.push(data.data)

      dispatch({
        type: CREATE_DB,
        dbs
      })

      dispatch({ type: RM_LOADING, key: 'createDB' })
    })
    .catch(err => handleNetworkError(err))
}

export const privatizeDB = ({ account, db }) => (dispatch) => {
  dispatch({ type: SET_LOADING, key: 'privatizeDB' })
  return Covenant.Privatize.post({ account, db })
    .then(({ data }) => {
      let { tx } = data.data
      dispatch({
        type: PRIVATIZE_DB,
        db,
        tx
      })
      dispatch({ type: RM_LOADING, key: 'privatizeDB' })
    })
}

export const setAdminerDBID = ({ dbid }) => dispatch => {
  dispatch({
    type: SET_ADMINER_DBID,
    dbid
  })
}
