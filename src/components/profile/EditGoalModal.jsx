import React, { useRef } from 'react'
import GoalSettingForm from '../goal-setting/GoalSettingForm'
import { useGetGoalQuery, useUpdateGoalMutation } from '../../services/goalService'
import Loader from '../Loader'
import PrimaryBtn from '../PrimaryBtn'


const EditGoalModal = ({
    closeModal,
}) => {


  const {data:goalData, isLoading:goalDataLoading, isSuccess:goalDataSuccess} = useGetGoalQuery()

  const [updateGoal, {isLoading: updateGoalLoading, isSuccess:updateGoalSuccess}] = useUpdateGoalMutation()

  const modalRef = useRef()
  const handleCloseModal = (e) => {
    if (modalRef.current === e.target){
        console.log("closing modal");
        closeModal()
    }
  }
  

  return (
    <div onClick={(e)=>(handleCloseModal(e))} ref={modalRef} className='fixed inset-0 min-h-screen max-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>

        <div className='w-full lg:w-4/12 min-h-[100vh] bg-white border-secondary border-0 lg:rounded-3xl flex flex-col items-center justify-start'>
            {goalDataLoading && <Loader/>}

            {updateGoalSuccess && 
                <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Goal updated successfully.
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(closeModal())}/>
            </div>
            }

            {(goalDataSuccess && !updateGoalSuccess) && 
            <GoalSettingForm 
            toUpdate={true} 
            goalData={goalData[0]} 
            closeModal={closeModal}
            updateGoal={updateGoal}
            updateGoalLoading={updateGoalLoading}
            />}

        </div>

    </div>
  )
}

export default EditGoalModal