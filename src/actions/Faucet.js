import * as ACTION_TYPES from './types'
import Covenant from '~/utils/api/Covenant'

import t from '~/utils/locales'
import { message } from 'antd'

export const postFaucet = ({ address, media_url }) => (dispatch) => {
  return Covenant.Faucet.post({ address, media_url })
    .then(({ data }) => {
      dispatch({
        type: ACTION_TYPES.POST_FAUCET,
        data
      })
    })
    .catch(err => {
      console.log(err)
      message.error(t('msg_netword_err'))
      return err
    })
}

export const getFaucet = ({ id, address }) => (dispatch) => {
  return Covenant.Faucet.get({ id, address })
    .then(({ data }) => {
      dispatch({
        type: ACTION_TYPES.GET_FAUCET,
        data
      })
    })
}
