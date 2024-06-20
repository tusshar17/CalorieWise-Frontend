import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/authService'
import { goalApi } from '../services/goalService'
import authReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [goalApi.reducerPath]: goalApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(goalApi.middleware),
})

setupListeners(store.dispatch)