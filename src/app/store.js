import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { authApi } from '../services/authService'
import { goalApi } from '../services/goalService'
import { userItemApi } from '../services/userItemService'
import {weightApi} from '../services/weightService'
import {mealLogApi} from '../services/mealLogService'
import authReducer from '../features/authSlice'
import goalReducer from '../features/goalSlice'


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  [authApi.reducerPath] : authApi.reducer,
  [goalApi.reducerPath] : goalApi.reducer,
  [userItemApi.reducerPath] : userItemApi.reducer,
  [weightApi.reducerPath] : weightApi.reducer,
  [mealLogApi.reducerPath] : mealLogApi.reducer,
  auth: authReducer,
  goal: goalReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultReducer) => getDefaultReducer({serializableCheck: false,}).concat(authApi.middleware).concat(goalApi.middleware).concat(userItemApi.middleware).concat(weightApi.middleware).concat(mealLogApi.middleware)
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)