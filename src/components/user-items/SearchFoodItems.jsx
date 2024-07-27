import React, { useEffect, useState } from 'react'
import { useSearchFoodItemsQuery } from '../../services/userItemService'
import { useSelector } from 'react-redux'
import crossIcon from '../../assets/icons/cross-icon.svg'
import Input from '../Input'
import FoodItemInRecipe from './FoodItemInRecipe'

function SearchFoodItems({
    setRecipeItems,
    recipeItems
}) {

  const [searchQuery, setSearchQuery] = useState('')
  const [itemSuggestions, setItemSuggestions] = useState([])
  const [selectedItems, setSelectedItems] = useState(recipeItems ? recipeItems : [])

  const [selectedItemSet, setSelectedItemSet] = useState(new Set())

//   const {data, isLoading, isError} = useSearchFoodItemsQuery(searchQuery)

  const foodItems = useSelector((state)=>(state.userItemApi.queries['getFoodItems(undefined)'].data))
  console.log("qqqqq", foodItems);

  useEffect(() => {
    const fetchFoodItems = () => {
        if (searchQuery.trim() === ""){
            setItemSuggestions([])
            return;
        }
        setItemSuggestions(foodItems.filter((item)=>item.name.toLowerCase().includes(searchQuery.toLowerCase())))
      }
    fetchFoodItems()
  }, [searchQuery])

  const handleSelectItem = (e, item) => {
    e.preventDefault()
    console.log("item in handleSelectItem", item);
    let recipeItem = {
        ...item,
        "qty_used_in_g": item.serving_size_in_g
    }
    console.log("selected items", selectedItems);
    setSelectedItems([...selectedItems, recipeItem])
    setSelectedItemSet(new Set([...selectedItemSet, recipeItem.id]))
    setSearchQuery("")
    setItemSuggestions([])
    setRecipeItems([...selectedItems, recipeItem])
    console.log("aaaaaaaaaa");
  }

  const handleQtyChange = (e, index) => {
    console.log(e.target.value, index);
    setSelectedItems((prevItems)=>
        (prevItems.map((it, i) => {
            return i==index ? {...it, 'qty_used_in_g':Number(e.target.value)} : it
        }))
    )

    setRecipeItems((prevItems)=>
        (prevItems.map((it, i) => {
            return i==index ? {...it, 'qty_used_in_g':Number(e.target.value)} : it
        }))
    )
  }

  const handleRemove = (e, index, item) => {
    e.preventDefault()
    setSelectedItems((prevItems)=>prevItems.filter((_, i)=>i!==index))
    setRecipeItems((prevItems)=>prevItems.filter((_, i)=>i!==index))
    setSelectedItemSet((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(item.id);
        return newSet;
      });
  }
  
  console.log(selectedItems);

  useEffect(() => {
    console.log(itemSuggestions);
  }, [searchQuery])
    
  return (
    <div id='item-search-container' className='w-full flex flex-col relative'>
        <div id='item-search-input' className='w-full flex items-center flex-wrap gap-2 rounded-lg'>
            <div className='w-full'>
            <h1 className='text-secondary text-lg font-medium'>Add Food Items in Recipe</h1>
            <input 
            placeholder='Search items here'
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value)}}
            onBlur={()=>{setTimeout(()=>(setItemSuggestions([])), 300)}}
            className='w-11/12 h-12 bg-lightwhite rounded-lg p-2 outline-none text-secondary border-2 border-secondary'/>
            {/* search suggestions */}
            {searchQuery &&
            <div className='w-full bg-[#d1cfcf] mt-2 rounded-lg flex flex-col max-h-56 overflow-y-scroll absolute'>
                {
                    itemSuggestions?.map((item, index) => !selectedItemSet.has(item.id) ? (
                        <button key={`itemsuggest-${index}`} onClick={(e) => handleSelectItem(e, item)} className='border-b-[1px] border-extralight hover:bg-extralight w-full py-2 px-4 last:border-none flex flex-col items-start justify-center gap-1'>
                        <h1 className='text-md text-blackdark font-medium'>{item.name}</h1>
                        <h3 className='text-md text-blcklight font-medium'>(Serving of {item.serving_size_in_g}g)</h3>
                        <h3 className='text-md text-blcklight font-medium'>
                        Cal: {item.calories}, P: {item.protein_in_g}g, C: {item.carbs_in_g}g, F: {item.fats_in_g}g
                        </h3>

                        </button>
                    ) : <></> ) 
                }
            </div>}
            </div>
        </div>
        {/* selected Items */}
        <FoodItemInRecipe recipeItems={selectedItems} handleQtyChange={handleQtyChange} handleRemove={handleRemove}/>
        
    </div>
  )
}

export default SearchFoodItems




// {(selectedItems?.length>0) && <div id='selected-items' className='mt-4 w-full'>
//     <h2 className='text-secondary text-lg font-medium'>Items In Recipe:</h2>
//         <div className='w-full flex flex-col gap-2 mt-2 p-2 min-h-[42vh] max-h-[30vh] overflow-y-scroll rounded-xl items-center justify-start'>
//         {selectedItems.map((item, index)=>(
//             <li key={`selecteditem-${index}`} className='list-none w-full'>
//             <div className='w-full bg-white p-4 rounded-xl flex flex-col gap-1'>
//                 <h1 className='text-lg text-blackdark font-medium'>{item.name}</h1>
//                 <h3 className='text-md text-blcklight font-medium'>
//                 Cal: {(item.calories/item.serving_size_in_g)*selectedItems[index].qty_used_in_g}, P: {(item.protein_in_g/item.serving_size_in_g)*selectedItems[index].qty_used_in_g}g, C: {(item.carbs_in_g/item.serving_size_in_g)*selectedItems[index].qty_used_in_g}g, F: {(item.fats_in_g/item.serving_size_in_g)*selectedItems[index].qty_used_in_g}g
//                 </h3>
//                 <div className='flex items-end justify-between w-full mt-2'>
//                     <div className='w-2/5 h-auto flex flex-col justify-start items-start'>
//                         <h2 className='text-md text-blcklight font-medium'>Qty. Used (in g)</h2>
//                         <input 
//                         value={selectedItems[index].qty_used_in_g}
//                         onChange={(e) => handleQtyChange(e, index)}   
//                         className="w-full h-12 bg-blcklight bg-opacity-15 border-blackdark border-0 rounded-md text-blackdark px-2"/>
//                     </div>
//                     <button 
//                     onClick={(e)=>handleRemove(e, index, item)}
//                     className='w-2/5 h-12 border-2 rounded-md border-blcklight flex items-center justify-center gap-2'>
//                         {/* <img src={crossIcon} className='w-6 h-6'/> */}
//                         <h2 className='text-md text-blcklight font-medium'>Remove</h2>
//                     </button>
//                 </div>
//             </div>
//             </li>
//             ))}
//         </div>
// </div>}