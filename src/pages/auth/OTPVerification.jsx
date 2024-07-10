import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AppName from '../../components/AppName'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../../components/Input'
import PrimaryBtn from '../../components/PrimaryBtn'
import SecondaryBtn from '../../components/SecondaryBtn'
import logoImage from '../../assets/images/food-macro-icon.png'
import {useVerifyOTPMutation} from '../../services/authService'
import { storeToken, getToken } from '../../services/LocalStorageService'
import { setVerified, setToken } from '../../features/authSlice'


const OTP_REGEX = /^\d{4}$/

function OTPVerification() {

    const userEmail = useSelector((state) => state.auth.user_email)
    const dispatch = useDispatch()

  const navigate = useNavigate()

    const [otp, setOtp] = useState('')
    const [validOtp, setValidOtp] = useState(false)
    const [otpFocus, setOtpFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setValidOtp(OTP_REGEX.test(otp))
        setErrMsg("")
    }, [otp])

    const [verifyOTP, {isLoading}] = useVerifyOTPMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrMsg("")
        // if submitted by hack
        const v1 = OTP_REGEX.test(otp)
        if(!v1){
            setErrMsg("Invalid Details")
            setValidOtp(false)
        }

        //
        const reqData = {
            email: userEmail,
            otp: otp
        }

        try {
            const res = await verifyOTP(reqData)
            console.log(res);
            // wrong otp
            if (res.error){
                setErrMsg("Please enter a correct otp")
            }
            // correct otp
            if (res.data){
                // storeToken(res.data.token)
                const {access_token, refresh_token} = res?.data?.token
                dispatch(setToken({access_token, refresh_token}))
                dispatch(setVerified())
                console.log("token in ls", getToken());
                navigate("/goal-setting")
            }
        } catch (error) {
            console.log("failed:", error);
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
              
              <h1 className='text-secondary text-4xl font-semibold mx-auto mt-12 lg:mt-0 lg:mx-0 lg:mb-4'>Verify OTP</h1>
              <h3 className='text-blcklight text-xl font-medium mx-auto mt-12 lg:mt-0 lg:mx-0 lg:mb-4'>OTP sent on {userEmail}</h3>

              {errMsg && otp && <h3 className='text-blcklight text-xl font-medium mx-auto mt-4 lg:mt-0 lg:mx-0 lg:mb-4'>{errMsg}</h3>}
                  
              <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2'>
    
                <Input 
                label="OTP" 
                type='text' 
                value={otp} 
                onFocus={()=>setOtpFocus(true)}
                onBlur={()=>setOtpFocus(false)}
                onChange={(e)=>{setOtp(e.target.value)}}/>
                <p className={!validOtp ? "text-blcklight text-sm pl-2" : "hidden"}>OTP should be of 4 digits.</p>
    
                <PrimaryBtn 
                className='mt-2' 
                type="submit" 
                value='Verify OTP' 
                disabled={!validOtp}/>
    
              </form>
    
              <h2 className='text-blackdark mt-2 font-medium pl-2'>Didn't receive OTP?</h2>
              <SecondaryBtn className='mt-0' value='Resend OTP'/>
    
            </div>
            
        </section>
      )
}

export default OTPVerification
