import React from 'react'
import AppName from '../../components/AppName'
import ArrowIcon from '../../assets/icons/arrow-icon.svg'
import BottomMenu from '../../components/BottomMenu'
import CaloriesSummary from '../../components/diary/CaloriesSummary'
import GoalLogo from '../../assets/icons/goal.png' 
import foodLogo from '../../assets/icons/food.png' 
import smileLogo from '../../assets/icons/smile.png'
import mealLogo from '../../assets/icons/mealLogo.png'    
import { goalApi } from '../../services/goalService'
import MacroSummary from '../../components/diary/MacroSummary'
import SecondaryBtn from '../../components/SecondaryBtn'

function Diary() {
  return (
    <div className='w-screen h-auto min-h-screen flex flex-col items-center bg-lightwhite'>

        <AppName className='fixed top-0 gradient-bg w-full h-20'/>

        <div id='day-navigation' className='w-full h-16 lg:w-3/5 lg:mt-24 mt-20 lg:rounded-full bg-white flex flex-row justify-around items-center'>
            <img src={ArrowIcon}/>
            <h2 className='text-secondary text-xl font-semibold'>Today</h2>
            <img src={ArrowIcon} className='scale-x-[-1]'/>
        </div>

        <div className='border-2 border-blackdark w-full h-auto lg:w-3/4 px-4 lg:px-0 mt-8 flex flex-col flex-wrap lg:flex-row gap-4 justify-evenly items-center'>
          <div id='cal-sec-diary' className='border-2 border-secondary bg-white rounded-2xl w-full lg:w-1/3 flex flex-col gap-4 justify-center items-center py-4 px-8'>
            <CaloriesSummary name="Goal" val={2800} icon={GoalLogo}/>
            <CaloriesSummary name="Food" val={2800} icon={foodLogo}/>
            <hr className='bg-extralight h-[2px] w-11/12'/>
            <CaloriesSummary name="Remaining" val={2800} icon={smileLogo}/>
          </div>

          {/* macros */}
          <div id='macro-sec-diary' className='border-2 border-secondary bg-white rounded-2xl w-full lg:w-1/3 flex flex-row gap-4 justify-between items-center py-4 px-8'>
            <MacroSummary name="Protein" goal={100} val={50}/>
            <MacroSummary name="Carbs" goal={300} val={220}/>
            <MacroSummary name="Fats" goal={60} val={30}/>
            <MacroSummary name="Sugar" goal={40} val={20}/>
          </div>

          {/* btn - create new meal */}
          <SecondaryBtn value='Create a new meal' className='w-3/4 lg:w-1/4 lg:mx-80 mt-4 h-16'/>
        </div>
        

        <BottomMenu className='fixed bottom-0 lg:left-0 lg:top-[18vh] z-40'/>

    </div>
  )
}

export default Diary