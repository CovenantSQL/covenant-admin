import * as ACTION_TYPES from './types'
import Covenant from '~/utils/api/Covenant'
import _get from 'lodash/get'

import t from '~/utils/locales'
import { notification } from 'antd'

export const postFaucet = ({ address, media_url }) => (dispatch) => {
  return Covenant.Faucet.post({ address, media_url })
    .then(({ data }) => {
      dispatch({
        type: ACTION_TYPES.POST_FAUCET,
        data
      })
    })
    .catch(err => {
      console.error(err)
      const status = _get(err, 'status', '')

      notification.error({
        message: status !== '' ? t(status) : t('msg_netword_err'),
        description: '',
        duration: 0
      })
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
