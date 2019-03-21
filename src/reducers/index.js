import { combineReducers } from 'redux'

import user from './User'
import faucet from './Faucet'
import loading from './Loading'

export default combineReducers({
  user,
  faucet,
  loading,
})
