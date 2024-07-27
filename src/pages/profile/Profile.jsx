import React, { useEffect, useState } from 'react'
import AppName from '../../components/AppName'
import BottomMenu from '../../components/BottomMenu'
import EditIcon from '../../assets/icons/edit-icon.svg'
import SecondaryBtn from '../../components/SecondaryBtn'
import {clearToken, removeUserEmail, resetVerified} from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditGoalModal from '../../components/profile/EditGoalModal'
import { useGetProfileQuery } from '../../services/authService'
import ProfileRenameModal from '../../components/profile/ProfileRenameModal'

const Profile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(clearToken())
    dispatch(resetVerified())
    dispatch(removeUserEmail())
    navigate('/login')
  }

  const [showGoalEditModal, setShowEditModal] = useState(false)
  const [showProfileRenameModal, setShowProfileRenameModal] = useState(false)

  const {data:profileData, isLoading:profileLoading, isError:profileError, isSuccess:profileSuccess, refetch} = useGetProfileQuery()

  useEffect(()=>{
    refetch()
  }, [showProfileRenameModal])

  console.log("zzzz", profileData);


  return (
    <div className='w-screen h-auto min-h-screen flex flex-col items-center bg-lightwhite'>
        <AppName className='fixed top-0 gradient-bg w-full h-20' showTagLine={false}/>

        {showGoalEditModal && <EditGoalModal closeModal={() => (setShowEditModal(false))}/>}

        {(showProfileRenameModal && profileSuccess) && <ProfileRenameModal closeModal={() => (setShowProfileRenameModal(false))} profileData={profileData}/>}

        <div className='mt-28 flex flex-col gap-8'>

            {profileSuccess && 
            <button onClick={()=>(setShowProfileRenameModal(true))} className='bg-white bg-opacity-50 border-2 border-white px-4 w-[90vw] lg:w-[30vw] h-16 rounded-xl flex flex-row justify-between items-center'>
                <h2 className='text-secondary text-md lg:text-lg font-semibold'>{profileData.name}</h2>
                <img src={EditIcon} className='w-[28px] h-[28px]'/>
            </button>
            }

            <button onClick={()=>(setShowEditModal(true))} className='bg-white bg-opacity-50 border-2 border-white px-4 w-[90vw] lg:w-[30vw] h-16 rounded-xl flex flex-row justify-between items-center'>
                <h2 className='text-secondary text-md lg:text-lg font-medium'>View or Update Goal</h2>
            </button>

            <SecondaryBtn
            value='Log Out'
            className='w-1/3 h-12'
            onClick={handleLogOut}
            />

            

        </div>

        <BottomMenu className='fixed bottom-0 lg:left-0 lg:top-[18vh] z-40'/>       
    </div>
  )
}

export default Profile