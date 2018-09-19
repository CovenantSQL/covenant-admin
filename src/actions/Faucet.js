import * as ACTION_TYPES from './types'
import Covenant from '~/utils/api/Covenant'

export const postFaucet = ({ address, media_url }) => (dispatch) => {
  return Covenant.Faucet.post({ address, media_url })
    .then(({ data }) => {
      dispatch({
        type: ACTION_TYPES.POST_FAUCET,
        data
      })
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
