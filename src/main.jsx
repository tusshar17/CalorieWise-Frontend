import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { goalApi } from './services/goalService.js'
import SignUp from "./pages/auth/SignUp.jsx"
import OTPVerification from './pages/auth/OTPVerification.jsx'
import Layout from './components/Layout.jsx'
import GoalSetting from './pages/goal_setting/GoalSetting.jsx'
import HomePage from './pages/home/HomePage.jsx'



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
        path: "otpverification",
        element: <OTPVerification/>
      },
      {
        path: "goal-setting",
        element: <GoalSetting/>
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
