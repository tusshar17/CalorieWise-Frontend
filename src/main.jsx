import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './app/store.js'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { PersistGate } from 'redux-persist/integration/react'
import { goalApi } from './services/goalService.js'
import SignUp from "./pages/auth/SignUp.jsx"
import LogIn from './pages/auth/LogIn.jsx'
import OTPVerification from './pages/auth/OTPVerification.jsx'
import Layout from './components/Layout.jsx'
import GoalSetting from './pages/goal_setting/GoalSetting.jsx'
import HomePage from './pages/home/HomePage.jsx'
import Diary from './pages/diary/Diary.jsx'
import UserItems from './pages/useritems/UserItems.jsx'
import WeightPage from './pages/weight/WeightPage.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <HomePage/>
      },
      {
        path: "signup",
        element: <SignUp/>
      },
      {
        path: "login",
        element: <LogIn/>
      },
      {
        path: "otpverification",
        element: <OTPVerification/>
      },
      {
        path: "goal-setting",
        element: <GoalSetting/>
      },
      {
        path: "diary",
        element: <Diary/>
      },
      {
        path: "my-items",
        element: <UserItems/>
      },
      {
        path: "weight",
        element: <WeightPage/>
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
