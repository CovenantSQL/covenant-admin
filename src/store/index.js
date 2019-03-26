import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk'

// reducers
import cql from './covenant'
import loading from './loading'

const reducers = combineReducers({
  cql,
  loading,
})

// persistant
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['loading']
}
const persistedReducer = persistReducer(persistConfig, reducers)

// enhancers & middlewares
const enhancers = []
const middleware = [
  thunk
]
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension
  middleware.push(createLogger())

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}
const composeEnhances = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default () => {
  let store = createStore(persistedReducer, composeEnhances)
  let persistor = persistStore(store)
  return { store, persistor }
}
