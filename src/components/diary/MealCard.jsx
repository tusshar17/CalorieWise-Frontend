import { useState } from 'react'
import PrimaryBtn from '../PrimaryBtn'
import MacroSummary from './MacroSummary'
import MealItem from './MealItem'
import MealEditModal from './Modals/MealEditModal'
import MealItemModal from './Modals/MealItemModal'
import editIcon from '../../assets/icons/edit-icon.svg'

const MealCard = ({
  mealData,
  key,
  meal_logs
}) => {

  const [showMealRenameModal, setShowMealRenameModal] = useState(false)

  const [showMealItemModal, setShowMealItemModal] = useState(false)


  return (
    <div key={`meal-card-${key}`} className='w-full h-auto lg:w-11/12 bg-white bg-opacity-70 rounded-3xl border-2 border-white  flex flex-col gap-2 lg:gap-4'>

        {showMealRenameModal && 
        <MealEditModal
        onClose={()=>(setShowMealRenameModal(false))} 
        toRename={true} 
        mealData={mealData}
        meal_logs={meal_logs}
        />}

        {showMealItemModal &&
        <MealItemModal
        onClose={()=>(setShowMealItemModal(false))} 
        toUpdate={false}
        completeLogs={meal_logs}
        eachLog={mealData}
        />
        }

        <div className='w-full flex flex-row gap-2 justify-center items-start mb-4 lg:mb-2 px-4 pt-4'>
            <button onClick={()=>(setShowMealRenameModal(true))} className='w-full text-secondary text-left text-xl font-medium h-1/2 py-2 flex flex-row justify-start items-center gap-4'>
            {mealData.meal_name}
            <img src={editIcon} className='w-[24px]'/>
            </button>
            <PrimaryBtn 
            onClick={()=>{
              setShowMealItemModal(true)
              }} 
            value='+ Add' 
            textSize='text-sm' 
            className='w-2/5 lg:w-1/4 h-12'/>
        </div>
      
        <div className='flex flex-col'>
        {mealData.food_items.map((item, i)=>(
          <MealItem mealLog={mealData} dayLogs={meal_logs} mealItemInfo={item} key={item.name+i}/>
        ))}
        </div>

        <div className='flex flex-col gap-4 rounded-b-3xl bg-primary bg-opacity-10'>
        <div className='flex flex-row justify-between items-center px-4 pt-4'>
            <h1 className='text-secondary text-lg font-medium'>Total Calories</h1>
            <h1 className='text-secondary text-lg font-medium'>{mealData.meal_macros.calories} Cal</h1>
        </div>

        <div className='flex flex-row justify-between items-center px-6 pb-4'>
            <MacroSummary name="Protein" val={mealData.meal_macros.protein_in_g.toFixed(0)} showGoal={false}/>
            <MacroSummary name="Carbs" val={mealData.meal_macros.carbs_in_g.toFixed(0)} showGoal={false}/>
            <MacroSummary name="Fats" val={mealData.meal_macros.fats_in_g.toFixed(0)} showGoal={false}/>
            <MacroSummary name="Sugar" val={mealData.meal_macros.sugar_in_g.toFixed(0)} showGoal={false}/>
        </div>
        </div>
    
    </div>
  )
}

export default MealCard