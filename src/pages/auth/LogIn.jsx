import React, { useState, useRef, useEffect } from 'react'
import Input from '../../components/Input'
import AppName from '../../components/AppName'
import PrimaryBtn from '../../components/PrimaryBtn'
import SecondaryBtn from '../../components/SecondaryBtn'
import logoImage from '../../assets/images/food-macro-icon.png'
import {useLogInUserMutation} from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux' 
import { setUserEmail, setToken, setVerified } from '../../features/authSlice'
import { clearGoal } from '../../features/goalSlice'


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const NAME_REGEX = /^[a-zA-Z]{3,15}$/
const PASS_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\~-]{6,15}$/



function SignUp() {
  const errRef = useRef()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)


  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)


  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // emailRef.current.focus()
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])


  useEffect(() => {
    const result = PASS_REGEX.test(pwd)
    setValidPwd(result)
  }, [pwd])


  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  const [logInUser, {isError, error, data, isLoading}] = useLogInUserMutation()

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if submitted by hack
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PASS_REGEX.test(pwd)
    if (!v1 || !v2){
      setErrMsg("Invalid Details")
      return
    }

    //
    const userData = {
      email: email,
      password: pwd,
    }

    try {
      const res = await logInUser(userData)
      console.log("Response:", res);
      console.log("Response status code:", res.meta);
      if (res?.error?.status==400){
        console.log(res?.error?.data?.errors?.errors?.non_field_errors);
        setErrMsg(res?.error?.data?.errors?.errors?.non_field_errors[0])
      }
      if (res?.error?.status==429){
        console.log(400000);
        setErrMsg(res?.error?.data?.errors.detail)
      }
      if (res?.error?.status==="FETCH_ERROR"){
        setErrMsg("Failed to connect")
      }
      if (res.data){
        dispatch(clearGoal())
        dispatch(setUserEmail({user_email: userData.email}))
        dispatch(setVerified())
        const {access_token, refresh_token} = res?.data?.token
        console.log("login comp:", {access_token, refresh_token});
        dispatch(setToken({access_token, refresh_token}))
        console.log("gdgfgdf", res.data);
        navigate('/')
      }
    } catch (error) {
      console.log("Failed:", error);
    }
  }

  return (
    <section className='flex flex-col w-screen h-screen justify-center items-center lg:flex-row lg:justify-between'>
        <div className='w-full flex justify-center items-center flex-col'>
          <AppName/>
          <img src={logoImage} className='hidden lg:block size-60 mr-12 lg:size-1/3'/>
        </div>

        <div className='relative bg-white px-16 py-8 mt-20 lg:mt-0 rounded-t-3xl lg:rounded-r-none lg:rounded-l-3xl flex flex-col gap-2 justify-center items-start h-screen w-full lg:w-1/2'>
          
          <img src={logoImage} className='lg:hidden w-60 h-auto absolute -top-20 left-16'/>
          
          <h1 className='text-secondary text-4xl font-semibold mx-auto mt-24 lg:mt-0 lg:mx-0 lg:mb-4'>Log In</h1>

          <p ref={errRef} className={errMsg ? "text-blcklight text-lg" : "hidden"}>{errMsg}</p>
          
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>

            <Input 
            label="Email" 
            className="w-full lg:w-3/5"
            type='email'
            placeholder='joe@email.com' 
            value={email} 
            onFocus={()=> setEmailFocus(true)}
            onBlur={()=> setEmailFocus(false)}
            onChange={(e)=>{setEmail(e.target.value)}}/>
            <p className={emailFocus && email && !validEmail ? "text-blcklight text-sm pl-2" : "hidden"}>enter a valid email</p>

            
            <Input 
            label="Password"
            className="w-full lg:w-3/5"
            type='password' 
            value={pwd} 
            onFocus={()=> setPwdFocus(true)}
            onBlur={()=> setPwdFocus(false)}
            onChange={(e)=>{setPwd(e.target.value)}}/>
            <ul className={pwdFocus && !validPwd ? "text-blcklight text-sm font-medium pl-2 list-disc" : "hidden"}>
              <li>
              can contain alphabets, numbers and special characters
              </li>
              <li>
              minimum 6 characters
              </li>
            </ul>

            
            <PrimaryBtn 
            className='mt-2 h-12 w-full lg:w-3/5' 
            isLoading={isLoading}
            type="submit" 
            value='Log In' 
            disabled={!validEmail || !validPwd ? true : false}/>

          </form>

          <h2 className='text-secondary mt-2 font-normal pl-2'>Don't have an account?</h2>
          <SecondaryBtn 
          className='mt-0 h-12 w-full lg:w-3/5' 
          value='Sign Up' 
          onClick={()=>{navigate('/signup')}}/>

        </div>
        
    </section>
  )
}

export default SignUp