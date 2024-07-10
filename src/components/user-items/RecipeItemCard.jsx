import React, { useState } from 'react'
import RecipeItemModal from '../user-items/RecipeItemModal'
import FoodItemModal from './FoodItemModal'

function RecipeItemCard({
    recipeData,
}) {

  const [showEditRecipeModal, setShowEditRecipeModal] = useState(false)

  return (
    <>

        {(showEditRecipeModal) && 
        <RecipeItemModal
        onClose={()=>{setShowEditRecipeModal(false)}}
        toUpdate={true}
        recipeData={recipeData}
        />
        }



        <button className='bg-white w-full h-auto mb-4 p-4 lg:p-6 lg:hover:bg-extralight lg:hover:bg-opacity-20 ease-in-out duration-200 rounded-2xl flex flex-col justify-start items-start gap-2 shadow-white shadow-sm' onClick={()=>{setShowEditRecipeModal(true)}}>
            
            <div className='flex flex-col lg:flex-row lg:justify-between gap-1 items-start w-full'>
                <h2 className='text-lg text-secondary font-medium'>{recipeData.name}</h2>
            </div>

            <h3 className='text-md text-blcklight font-medium text-left'>Cal: {recipeData.total_calories}, P: {recipeData.total_protein_in_g}g, C: {recipeData.total_carbs_in_g}g, F: {recipeData.total_fats_in_g}g</h3>

            <div className='flex flex-row gap-2 flex-wrap mt-2'>
                {recipeData.recipe_items.map((item, index)=>(<h3 key={`recipeItem${index}`} className='py-2 px-4 text-blcklight text-sm font-medium bg-secondary bg-opacity-20 rounded-full'>{`${item.name} (${item.qty_used_in_g}g)`}</h3>))}
            </div>

        </button>
    </>
  )
}

export default RecipeItemCard