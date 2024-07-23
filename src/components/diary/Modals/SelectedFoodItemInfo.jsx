import React from 'react'

const SelectedFoodItemInfo = ({
    selectedFoodItem,
    foodItemQtyUsed,
    handleFoodItemQtyChange
}) => {

    const calculateMacros = (val) => {
        return ((val/selectedFoodItem.serving_size_in_g)*foodItemQtyUsed).toFixed(2)
      }

  return (
    <div className='w-full mt-8 flex flex-col gap-4'>

          <h1 className='text-xl text-secondary font-semibold'>{selectedFoodItem.name}</h1>

          <div className='w-full flex flex-row justify-between items-center'>
            <h2 className='text-lg text-secondary font-medium'>Serving Qty. (in g)</h2>
            <input 
            type='number'
            onChange={(e) => handleFoodItemQtyChange(e.target.value)}
            value={foodItemQtyUsed}
            className='w-1/3 py-2 px-2 bg-lightwhite border-b-2 border-secondary text-secondary text-xl font-medium outline-none'/>
          </div>

          <div className='w-full flex flex-row justify-between items-center mt-4'>
            <h2 className='text-lg text-blcklight font-medium'>Serving Size</h2>
            <h2 className='text-lg text-blackdark font-medium'>{selectedFoodItem.serving_size_in_g}g</h2>
          </div>

          <div className='w-full flex flex-row justify-between items-center mt-4'>
            <h2 className='text-lg text-blcklight font-medium'>Calories</h2>
            <h2 className='text-lg text-blackdark font-medium'>{calculateMacros(selectedFoodItem.calories)} Cal</h2>
          </div>

          <div className='w-full flex flex-row justify-between items-center mt-4'>
            <h2 className='text-lg text-blcklight font-medium'>Protein</h2>
            <h2 className='text-lg text-blackdark font-medium'>
            {calculateMacros(selectedFoodItem.protein_in_g)}g
              </h2>
          </div>

          <div className='w-full flex flex-row justify-between items-center mt-4'>
            <h2 className='text-lg text-blcklight font-medium'>Carbs</h2>
            <h2 className='text-lg text-blackdark font-medium'>
            {calculateMacros(selectedFoodItem.carbs_in_g)}g
            </h2>
          </div>

          <div className='w-full flex flex-row justify-between items-center mt-4'>
            <h2 className='text-lg text-blcklight font-medium'>Fats</h2>
            <h2 className='text-lg text-blackdark font-medium'>
            {calculateMacros(selectedFoodItem.fats_in_g)}g
            </h2>
          </div>

          <div className='w-full flex flex-row justify-between items-center mt-4'>
            <h2 className='text-lg text-blcklight font-medium'>Sugar</h2>
            <h2 className='text-lg text-blackdark font-medium'>
            {calculateMacros(selectedFoodItem.sugar_in_g)}g
            </h2>
          </div>

          </div>
  )
}

export default SelectedFoodItemInfo