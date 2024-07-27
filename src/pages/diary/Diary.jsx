import React, { useEffect, useState } from 'react'
import AppName from '../../components/AppName'
import ArrowIcon from '../../assets/icons/arrow-icon.svg'
import BottomMenu from '../../components/BottomMenu'
import CaloriesSummary from '../../components/diary/CaloriesSummary'
import GoalLogo from '../../assets/icons/goal.png' 
import foodLogo from '../../assets/icons/food.png' 
import smileLogo from '../../assets/icons/smile.png'
import MacroSummary from '../../components/diary/MacroSummary'
import SecondaryBtn from '../../components/SecondaryBtn'
import MealCard from '../../components/diary/MealCard'
import MealEditModal from '../../components/diary/Modals/MealEditModal'
import { useGetMealLogsQuery } from '../../services/mealLogService'
import PrimaryBtn from '../../components/PrimaryBtn'
import Loader from '../../components/Loader'
import {useGetGoalQuery} from '../../services/goalService'

function Diary() {

  // goal data
  const {data:goalData, isLoading:goalDataLoading, isSuccess:goalDataSuccess} = useGetGoalQuery()

  // modal visibility
  const [showMealEditModal, setShowMealEditModal] = useState(false)

  // const date = new Date().toISOString().split('T')[0]
  // const date = "2023-07-19"
  const today = new Date()
  const [date, setDate] = useState(today)

  const changeDate = (dt, toIncrement) => {
    let newDate = new Date(dt)
    const change = toIncrement ? 1 : -1
    newDate.setDate(newDate.getDate() + change)
    return newDate
  }

  const isToday = () => {
    let dd = date.getDate() == today.getDate()
    let mm = date.getMonth() == today.getMonth()
    let yyyy = date.getFullYear() == today.getFullYear()
    return dd && mm && yyyy
  }

  const {data:mealLogs, isLoading, isSuccess, refetch} = useGetMealLogsQuery(date.toISOString().split('T')[0])
  console.log("meal logs", mealLogs);
  
  useEffect(() => {
    console.log("use effect");
    console.log("date", date);
    console.log("meal logs", mealLogs);
    console.log("goal data", goalData);
    console.log("today", today.getDate());
  }, [date])


  return (
    <div className='w-screen h-auto min-h-screen flex flex-col items-center bg-lightwhite'>

        <AppName className='fixed top-0 gradient-bg w-full h-20' showTagLine={false}/>

        {showMealEditModal && 
        <MealEditModal 
        date={date} 
        onClose={()=>(setShowMealEditModal(false))} 
        meal_logs={mealLogs}
        />}

        {isLoading && <Loader className='mt-52'/>}

        {isSuccess && <>
        {/* day-navigation */}
        <div id='day-navigation' className='w-full h-16 lg:w-3/5 lg:mt-24 mt-20 lg:rounded-full bg-white flex flex-row justify-around items-center'>
          <button className='rounded-full lg:hover:bg-primary lg:hover:bg-opacity-10 ease-linear duration-150' onClick={()=>{setDate(changeDate(date, false))}}>
            <img src={ArrowIcon} className='h-full p-4 rounded-full lg:hover:bg-primary lg:hover:bg-opacity-10 ease-linear duration-150'/>
          </button>
          <h2 className='text-secondary text-xl font-semibold'>
          {isToday() ? 'Today' : date.toLocaleDateString('en-us', {year: 'numeric', month:'short', day:'numeric'})}
          </h2>
        <button className='rounded-full lg:hover:bg-primary lg:hover:bg-opacity-10 ease-linear duration-150' onClick={()=>{setDate(changeDate(date, true))}}>
          <img src={ArrowIcon} className='scale-x-[-1] h-full p-4'/>
        </button>
        </div>

        <div className='w-11/12 flex flex-col lg:flex-row gap-12 justify-center items-center mt-8 lg:mt-16'>

          {/* calories-summary | macros-summary | create-a-meal-button */}
          <div className='w-full h-auto lg:w-1/3 flex flex-col flex-wrap gap-4 justify-center items-center'>
            
            {/* calories */}
            <div id='cal-sec-diary' className='border-2 border-secondary bg-white rounded-2xl w-full flex flex-col gap-4 justify-center items-center py-4 px-8'>
              
              <CaloriesSummary 
              name="Goal" 
              val={goalData ? goalData[0]?.goal_calories.toFixed(0) : 0} 
              icon={GoalLogo}
              />

              <CaloriesSummary 
              name="Food" 
              val={mealLogs.logs ? mealLogs?.day_calories.toFixed(0) : 0} 
              icon={foodLogo}
              />

              <hr className='bg-extralight h-[2px] w-11/12'/>

              <CaloriesSummary 
              name="Remaining" 
              val={(goalData ? goalData[0]?.goal_calories.toFixed(0) : 0) - (mealLogs.logs ? mealLogs?.day_calories.toFixed(0) : 0)} 
              icon={smileLogo}/>

            </div>

            {/* macros */}
            <div id='macro-sec-diary' className='border-2 border-secondary bg-white rounded-2xl w-full flex flex-row gap-4 justify-between items-center py-4 px-8'>
              
              <MacroSummary 
              name="Protein" 
              goal={goalData ? goalData[0]?.goal_protein.toFixed(0) : '-'} 
              val={mealLogs.logs ? mealLogs?.day_protein.toFixed(0) : 0}
              />

              <MacroSummary 
              name="Carbs" 
              goal={goalData ? goalData[0]?.goal_carbs.toFixed(0) : '-'} 
              val={mealLogs.logs ? mealLogs?.day_carbs.toFixed(0) : 0}
              />

              <MacroSummary 
              name="Fats" 
              goal={goalData ? goalData[0]?.goal_fats.toFixed(0) : '-'} 
              val={mealLogs.logs ? mealLogs?.day_fats.toFixed(0) : 0}
              />
              
              <MacroSummary 
              name="Sugar" 
              goal={goalData ? goalData[0]?.goal_sugar.toFixed(0) : '-'} 
              val={mealLogs.logs ? mealLogs?.day_sugar.toFixed(0) : 0}
              />
            
            </div>

            {/* btn - create new meal */}
            {mealLogs.logs ? <SecondaryBtn onClick={()=>(setShowMealEditModal(true))} value="+ Create a new meal" className='w-3/4 lg:w-1/2 mt-4 h-16'/> :
            <PrimaryBtn onClick={()=>(setShowMealEditModal(true))} value="Start Today's Diary" className='w-3/4 lg:w-1/2 mt-4 h-16'/>}
          </div>
          {/*  */}

          {/* meal-cards */}
          {mealLogs.logs?.length>0 && <div className='w-full flex flex-col justify-start items-center gap-4 lg:w-[30vw] lg:max-h-[65vh] lg:min-h-[65vh] overflow-y-scroll lg:border-0 lg:border-blackdark mb-24 lg:mb-0'>
            {mealLogs && mealLogs?.logs.map((mealData, i)=>(
              <MealCard mealData={mealData} key={i} meal_logs={mealLogs}/>
            ))}
          </div>}

        </div>
        </>}
        

        <BottomMenu className='fixed bottom-0 lg:left-0 lg:top-[18vh] z-40'/>

    </div>
  )
}

export default Diary