import React, { useState, useRef, useEffect } from 'react'
import Input from '../../components/Input'
import AppName from '../../components/AppName'
import PrimaryBtn from '../../components/PrimaryBtn'
import SecondaryBtn from '../../components/SecondaryBtn'
import logoImage from '../../assets/images/food-macro-icon.png'
import {useRegisterUserMutation} from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux' 
import { setUserEmail } from '../../features/authSlice'


const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const NAME_REGEX = /^[a-zA-Z]{3,15}$/
const PASS_REGEX = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\~-]{6,15}$/



function SignUp() {
  const emailRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [nameFocus, setNameFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

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
    const result = NAME_REGEX.test(name)
    setValidName(result)
  }, [name])

  useEffect(() => {
    const result = PASS_REGEX.test(pwd)
    setValidPwd(result)
  }, [pwd])

  useEffect(() => {
    const result = PASS_REGEX.test(matchPwd)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [name, pwd, matchPwd, email])

  const [registerUser, {isError, error, data, isLoading}] = useRegisterUserMutation()

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // if submitted by hack
    const v1 = NAME_REGEX.test(name)
    const v2 = EMAIL_REGEX.test(email)
    const v3 = PASS_REGEX.test(pwd)
    if (!v1 || !v2 || !v3){
      setErrMsg("Invalid Details")
      return
    }

    //
    const userData = {
      email: email,
      name: name,
      password: pwd,
      confirm_password: matchPwd
    }

    try {
      const res = await registerUser(userData)
      console.log("Response:", res);
      console.log("Response status code:", res.meta);
      if (res?.error?.status==400){
        console.log(400000);
        setErrMsg(res?.error?.data?.errors.email)
      }
      if (res?.error?.status==429){
        console.log(400000);
        setErrMsg(res?.error?.data?.errors.detail)
      }
      if (res?.error?.status==="FETCH_ERROR"){
        setErrMsg("Failed to connect")
      }
      if (res.data){
        dispatch(setUserEmail({user_email: userData.email}))
        navigate('/otpverification')
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
          
          <h1 className='text-secondary text-4xl font-semibold mx-auto mt-24 lg:mt-0 lg:mx-0 lg:mb-4'>Sign Up</h1>

          <p ref={errRef} className={errMsg ? "text-blcklight text-lg" : "hidden"}>{errMsg}</p>
          
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2'>

            <Input 
            label="Email" 
            type='email' 
            value={email} 
            onFocus={()=> setEmailFocus(true)}
            onBlur={()=> setEmailFocus(false)}
            onChange={(e)=>{setEmail(e.target.value)}}/>
            <p className={emailFocus && email && !validEmail ? "text-blcklight text-sm pl-2" : "hidden"}>enter a valid email</p>

            <Input 
            label="Name" 
            type='text' 
            value={name} 
            onFocus={()=> setNameFocus(true)}
            onBlur={()=> setNameFocus(false)}
            onChange={(e)=>{setName(e.target.value)}}/>
            <p className={nameFocus && name && !validName ? "text-blcklight text-sm pl-2" : "hidden"}>only alphabets, minimum 3 letters</p>

            <Input 
            label="Password" 
            type='password' 
            value={pwd} 
            onFocus={()=> setPwdFocus(true)}
            onBlur={()=> setPwdFocus(false)}
            onChange={(e)=>{setPwd(e.target.value)}}/>
            <p className={pwdFocus && !validPwd ? "text-blcklight text-sm pl-2" : "hidden"}>can contain alphabets, numbers and special characters, minimum 6 characters</p>

            <Input 
            label="Confirm Password" 
            type='password'value={matchPwd} 
            onFocus={()=> setMatchFocus(true)}
            onBlur={()=> setMatchFocus(false)}
            onChange={(e)=>{setMatchPwd(e.target.value)}}/>
            <p className={!validMatch && matchPwd ? "text-blcklight text-sm pl-2" : "hidden"}>password not matching</p>

            <PrimaryBtn 
            className='mt-2' 
            isLoading={isLoading}
            type="submit" 
            value='Sign Up' 
            disabled={!validEmail || !validName || !validMatch ? true : false}/>

          </form>

          <h2 className='text-secondary mt-2 font-normal pl-2'>Already have an account?</h2>
          <SecondaryBtn className='mt-0' value='Log In'/>

        </div>
        
    </section>
  )
}

export default SignUp