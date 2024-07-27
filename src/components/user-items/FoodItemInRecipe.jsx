import React from 'react'

const FoodItemInRecipe = ({
  recipeItems = [],
  handleQtyChange,
  handleRemove,
  recipeName = "Recipe"
}) => {

  const calculateMacros = (val, servingSize, qtyUsed) => {
    return ((val/servingSize)*qtyUsed).toFixed(0)
  }

  return (
    <>
      {/* selected Items */}
      {(recipeItems?.length>0) && <div id='selected-items' className='mt-4 w-full'>
            <h2 className='text-secondary text-lg font-medium'>Items In {recipeName}:</h2>
                <div className='w-full flex flex-col gap-2 mt-2 p-2 min-h-[42vh] max-h-[30vh] overflow-y-scroll rounded-xl items-center justify-start'>
                {recipeItems.map((item, index)=>(
                    <li key={`selecteditem-${index}`} className='list-none w-full'>
                    <div className='w-full bg-white p-4 rounded-xl flex flex-col gap-1'>
                        <h1 className='text-lg text-blackdark font-medium'>{item.name}</h1>
                        <h3 className='text-md text-blcklight font-medium'>
                        Cal: {calculateMacros(item.calories, item.serving_size_in_g, recipeItems[index].qty_used_in_g)} Cal, 
                        P: {calculateMacros(item.protein_in_g, item.serving_size_in_g, recipeItems[index].qty_used_in_g)}g, 
                        C: {calculateMacros(item.carbs_in_g, item.serving_size_in_g, recipeItems[index].qty_used_in_g)}g, 
                        F: {calculateMacros(item.fats_in_g, item.serving_size_in_g, recipeItems[index].qty_used_in_g)}g
                        </h3>
                        <div className='flex items-end justify-between w-full mt-2'>
                            <div className='w-3/5 h-auto flex flex-col gap-1 justify-start items-start'>
                                <h2 className='text-md text-blcklight font-medium'>Qty. Used (in g)</h2>
                                <input 
                                value={recipeItems[index].qty_used_in_g}
                                onChange={(e) => handleQtyChange(e, index)} 
                                type='number'  
                                className="w-3/4 h-12 bg-blcklight bg-opacity-15 border-blackdark border-0 rounded-md text-blackdark px-2"/>
                            </div>
                            <button 
                            onClick={(e)=>handleRemove(e, index, item)}
                            className='w-2/5 h-12 border-2 rounded-md border-blcklight flex items-center justify-center gap-2'>
                                <h2 className='text-md text-blcklight font-medium'>Remove</h2>
                            </button>
                        </div>
                    </div>
                    </li>
                    ))}
                </div>
        </div>}
    </>
  )
}

export default FoodItemInRecipe