import React from 'react'
import AppName from '../../components/AppName'
import logoImage from '../../assets/images/food-macro-icon.png'
import GoalSettingForm from '../../components/goal-setting/GoalSettingForm'



const GoalSetting = () => {

   

  return (
    <section className='flex flex-col w-screen h-auto lg:h-screen justify-center items-center lg:flex-row lg:justify-between'>
            <div className='w-full flex justify-center items-center flex-col'>
              <AppName/>
              <img src={logoImage} className='hidden lg:block size-60 mr-12 lg:size-1/3'/>
            </div>
    
            <GoalSettingForm/>
            
        </section>
  )
}

export default GoalSetting