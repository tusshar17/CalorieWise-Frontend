import React, {useState} from 'react'
import MealItemModal from './Modals/MealItemModal'

const MealItem = ({
  mealLog,
  dayLogs,
  mealItemInfo
}) => {

  const [showMealItemModal, setShowMealItemModal] = useState(false)

  const calculateMacros = (val) => {
    return ((val/mealItemInfo.serving_size_in_g)*mealItemInfo.qty_used_in_g).toFixed(0)
  }

  return (
    <>
     {showMealItemModal &&
        <MealItemModal
        onClose={()=>(setShowMealItemModal(false))} 
        toUpdate={true}
        foodData={mealItemInfo}
        completeLogs={dayLogs}
        eachLog={mealLog}
        />
        }
    <button onClick={() => setShowMealItemModal(true)} className='p-4 flex flex-col gap-2 lg:hover:bg-extralight lg:hover:bg-opacity-20'>
        <div className='w-full flex flex-row justify-between items-center'>
            <h1 className='text-blackdark text-md font-medium lg:font-semibold'>{mealItemInfo.name}</h1>
            <h1 className='text-blackdark text-md font-medium lg:font-semibold'>{calculateMacros(mealItemInfo.calories)} Cal</h1>
        </div>
        <div className=' w-full flex flex-row justify-between items-center'>
            <h3 className='text-blcklight text-sm lg:text-md font-normal lg:font-medium'>P: {calculateMacros(mealItemInfo.protein_in_g)}g C: {calculateMacros(mealItemInfo.carbs_in_g)}g F: {calculateMacros(mealItemInfo.fats_in_g)}g</h3>
            <h3 className='text-blcklight text-sm lg:text-md font-normal lg:font-medium'>(serving of {mealItemInfo.qty_used_in_g}g)</h3>
        </div>
    </button>
    <hr className='bg-lightwhite h-[2px]'/>
    </>
  )
}

export default MealItem