import { combineReducers } from 'redux'

import user from './User'
import faucet from './Faucet'

export default combineReducers({
  user,
  faucet
})
