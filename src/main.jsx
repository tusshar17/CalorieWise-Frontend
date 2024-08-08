import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './app/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ErrorBoundary } from 'react-error-boundary'
import Loader from './components/Loader.jsx'

// import SignUp from "./pages/auth/SignUp.jsx"
// import LogIn from './pages/auth/LogIn.jsx'
// import OTPVerification from './pages/auth/OTPVerification.jsx'
// import GoalSetting from './pages/goal_setting/GoalSetting.jsx'
// import HomePage from './pages/home/HomePage.jsx'
// import Diary from './pages/diary/Diary.jsx'
// import UserItems from './pages/useritems/UserItems.jsx'
// import WeightPage from './pages/weight/WeightPage.jsx'
// import Profile from './pages/profile/Profile.jsx'
import Layout from './components/Layout.jsx' //
import ErrorFallBack from './components/ErrorBoundary.jsx'

// const Layout = lazy(()=>import('./components/Layout.jsx'))
const SignUp = lazy(()=>import("./pages/auth/SignUp.jsx"))
const LogIn = lazy(()=>import('./pages/auth/LogIn.jsx'))
const OTPVerification = lazy(()=>import('./pages/auth/OTPVerification.jsx'))
const GoalSetting = lazy(()=>import('./pages/goal_setting/GoalSetting.jsx'))
const HomePage = lazy(()=>import('./pages/home/HomePage.jsx'))
const Diary = lazy(()=>import('./pages/diary/Diary.jsx'))
const UserItems = lazy(()=>import('./pages/useritems/UserItems.jsx'))
const WeightPage = lazy(()=>import('./pages/weight/WeightPage.jsx'))
const Profile = lazy(()=>import('./pages/profile/Profile.jsx'))




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Suspense fallback={<Loader/>}> <HomePage/> </Suspense>
      },
      {
        path: "signup",
        element: <Suspense fallback={<Loader/>}> <SignUp/> </Suspense>
      },
      {
        path: "login",
        element: <Suspense fallback={<Loader/>}> <LogIn/> </Suspense>
      },
      {
        path: "otpverification",
        element: <Suspense fallback={<Loader/>}> <OTPVerification/> </Suspense>
      },
      {
        path: "goal-setting",
        element: <Suspense fallback={<Loader/>}> <GoalSetting/> </Suspense>
      },
      {
        path: "diary",
        element: <Suspense fallback={<Loader/>}> <Diary/> </Suspense>
      },
      {
        path: "my-items",
        element: <Suspense fallback={<Loader/>}> <UserItems/> </Suspense>
      },
      {
        path: "weight",
        element: <Suspense fallback={<Loader/>}> <WeightPage/> </Suspense>
      },
      {
        path: "profile",
        element: <Suspense fallback={<Loader/>}> <Profile/> </Suspense>
      }
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={()=>{}}>
          <RouterProvider router={router} fallbackElement={<Loader/>}/>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
