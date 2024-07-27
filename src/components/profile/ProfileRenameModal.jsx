import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import PrimaryBtn from '../PrimaryBtn'
import SecondaryBtn from '../SecondaryBtn'
import Loader from '../Loader'
import { useRenameProfileMutation } from '../../services/authService'

const ProfileRenameModal = ({
    profileData,
    closeModal,
}) => {

  const modalRef = useRef()
  const nameInputRef = useRef()

  const nameRegex = /^[A-Za-z][A-Za-z0-9]{2,}$/
  
  const [name, setName] = useState(profileData?.name)
  const [validName, setValidName] = useState(profileData?.name)

  useEffect(()=>{
    nameInputRef?.current.focus()
  }, [])

  useEffect(()=>{
    if (nameRegex.test(name)) {
        setValidName(true)
    }
    else {
        setValidName(false)
    }
  }, [name])

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target){
        closeModal()
    }
  }

  const [renameProfile, {isError:renameError, isSuccess:renameSuccess, isLoading:renameLoading}] = useRenameProfileMutation()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const userID = profileData.id
    const data = {name}
    const res = await renameProfile({userID, ...data})
    console.log("qazqaz", res);

  }
    
  return (
    <div onClick={(e)=>(handleCloseModal(e))} ref={modalRef} className='fixed inset-0 min-h-screen max-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>

        <div className='w-full lg:w-4/12 min-h-[50vh] bg-white border-secondary border-0 lg:rounded-3xl flex flex-col items-center justify-start'>
            
            <h1 className='text-white text-xl text-center font-medium bg-secondary rounded-t-2xl w-full h-16 pt-4'>
                Update Profile Name
            </h1>

            {renameSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Profile name updated successfully.
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(closeModal())}/>
            </div>}

            {(renameError) && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Some error occured 🥺
            </h1>

            <PrimaryBtn value='Close' className='w-36 h-12' onClick={()=>(closeModal())}/>
            </div>}

            {renameLoading && <Loader className='my-auto'/>}

            {(!renameError && !renameLoading && !renameSuccess) && <form className='w-full h-[30vh] my-auto flex flex-col gap-4 items-center justify-center' onSubmit={(e)=>(handleSubmit(e))}>
                <Input  
                type="text" 
                ref={nameInputRef}
                spellcheck="false"
                value={name}
                placeholder='John'
                onChange={(e)=>(setName(e.target.value))}
                parentClassName="w-3/4 lg:w-2/4" 
                flexDirection='flex-col'
                className="w-full"/>


                <div className='w-10/12 mt-6 flex flex-row justify-around'>
                <PrimaryBtn
                value="Update"
                disabled={!validName} 
                className='w-1/3 h-12'/>
                <SecondaryBtn value="Cancel" onClick={closeModal} className='w-1/3 h-12'/>
                </div>
            </form>}


        </div>
        
    </div>
  )
}

export default ProfileRenameModal