import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import localForage from 'localforage'
import io from 'socket.io-client'
import rootReducer from './reducers'
import createSocketIoMiddleware from './utils/redux-socket-io'

const socket = io({ path: '/WSS' })
const socketIoMiddleware = createSocketIoMiddleware(socket, 'WS/')

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = applyMiddleware(
  thunkMiddleware,
  socketIoMiddleware
)

const persistConfig = {
  key: 'root',
  storage: localForage,
  blacklist: ['products']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeEnhancers(middleware))

export const persistor = persistStore(store)

export default store;
