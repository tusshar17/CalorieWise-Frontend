import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/authService'
import { goalApi } from '../services/goalService'
import authReducer from '../features/authSlice'
import goalReducer from '../features/goalSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [goalApi.reducerPath]: goalApi.reducer,
    auth: authReducer,
    goal: goalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(goalApi.middleware),
})

setupListeners(store.dispatch)