import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { authApi } from '../services/authService'
import { goalApi } from '../services/goalService'
import { userItemApi } from '../services/userItemService'
import authReducer from '../features/authSlice'
import goalReducer from '../features/goalSlice'
// import persistReducer from 'redux-persist/es/persistReducer'


const persistConfig = {
  key: 'root',
  storage,
  blacklist: [`${userItemApi.reducerPath}`]
}

const rootReducer = combineReducers({
  [authApi.reducerPath] : authApi.reducer,
  [goalApi.reducerPath] : goalApi.reducer,
  [userItemApi.reducerPath] : userItemApi.reducer,
  auth: authReducer,
  goal: goalReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultReducer) => getDefaultReducer({serializableCheck: false,}).concat(authApi.middleware).concat(goalApi.middleware).concat(userItemApi.middleware)
})

export const persistor = persistStore(store)


// export const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     [goalApi.reducerPath]: goalApi.reducer,
//     auth: authReducer,
//     goal: goalReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware).concat(goalApi.middleware),
// })

setupListeners(store.dispatch)