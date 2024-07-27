import React, { useEffect, useRef, useState } from 'react'
import SwitchTab from '../../SwitchTab'
import FoodLogo from '../../../assets/icons/food.png'
import RecipeIcon from '../../../assets/icons/recipe-icon.svg'
import Input from '../../Input'
import DeleteIcon from '../../../assets/icons/delete-icon.svg'
import PrimaryBtn from '../../PrimaryBtn'
import SecondaryBtn from '../../SecondaryBtn'
import { useGetFoodItemsQuery, useGetRecipesQuery } from '../../../services/userItemService'
import { useUpdateMealLogMutation } from '../../../services/mealLogService'
import SelectedFoodItemInfo from './SelectedFoodItemInfo'
import FoodItemInRecipe from '../../user-items/FoodItemInRecipe'

const MealItemModal = ({
  onClose,
  toUpdate = false,
  foodData,
  RecipeData,
  eachLog,
  completeLogs
}) => {

  console.log("in mealitemmodal");
  console.log(toUpdate);
  console.log(eachLog);
  console.log(completeLogs);

  const modalRef = useRef()
  const closeModal = (e) => {
    if (modalRef.current === e.target){
        onClose()
    }
  }

  const [showFoodItems, setShowFoodItems] = useState(true)
  const [showRecipes, setShowRecipes] = useState(false)

  const clickFoodItemsTab = (e) => {
    setShowFoodItems(true)
    setShowRecipes(false)
    setSearchQuery('')
    setItemSelected('')
    setRecipeSelected('')
  }

  const clickRecipesTab = (e) => {
    setShowFoodItems(false)
    setShowRecipes(true)
    setSearchQuery('')
    setItemSelected('')
    setRecipeSelected('')
  }

  const [selectedFoodItem, setSelectedFoodItem] = useState(foodData)
  const [selectedRecipe, setSelectedRecipe] = useState()
  const [itemSelected, setItemSelected] = useState(false)
  const [recipeSelected, setRecipeSelected] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemSuggestions, setItemSuggestions] = useState([])
  const searchRef = useRef()
  const [searchFocused, setSearchFocused] = useState(false)

  const {data:foodItemsFetched, isSuccess:foodFetchSuccess} = useGetFoodItemsQuery()
  const {data:recipeItemsFetched, isSuccess:recipeFetchSuccess} = useGetRecipesQuery()

  useEffect(()=>{

    if(showFoodItems && foodFetchSuccess && !toUpdate){
      console.log("food items fetched", foodItemsFetched);
      console.log(searchRef.current.value);
      setItemSuggestions(foodItemsFetched.filter((item)=>item.name.toLowerCase().includes(searchRef.current.value.toLowerCase())))

      console.log("food suggestion", itemSuggestions);
    } 

    if (showRecipes && recipeFetchSuccess && !toUpdate){
      console.log("recipe items fetched", recipeItemsFetched);
      console.log(searchRef.current.value);
      setItemSuggestions(recipeItemsFetched.filter((item)=>item.name.toLowerCase().includes(searchRef.current.value.toLowerCase())))

      console.log("recipe suggestion", itemSuggestions);
    }
    

  },[searchQuery])

  const handleSelectItem = (e, item) => {
    console.log("selecte#######", item);
    setSearchQuery('')
    if(showFoodItems){
      setItemSelected(true)
      setSelectedFoodItem(item)
    }

    if(showRecipes){
      setRecipeSelected(true)
      setSelectedRecipe({...item})
    }

  }

  const [foodItemQtyUsed, setFoodItemQtyUsed] = useState(foodData?.qty_used_in_g)

  useEffect(() => {
    console.log("non req useffect calling");
    setFoodItemQtyUsed(selectedFoodItem?.qty_used_in_g ? selectedFoodItem?.qty_used_in_g : selectedFoodItem?.serving_size_in_g)
  }, [selectedFoodItem])


  const [updateMealLog, {isLoading:createNewLogLoading, isError:createNewLogError, isSuccess:createNewLogSuccess}] = useUpdateMealLogMutation()

  const handleCreate = async(e) => {
    e.preventDefault()

    const mealLogID = completeLogs.id
    const mealID = eachLog.meal_id
    
    const mealToBeUpdated = {...completeLogs.logs.filter(meal=>meal.meal_id===mealID)[0]}

    if (!toUpdate) {

      if (showFoodItems){
        mealToBeUpdated.food_items = [...mealToBeUpdated.food_items, {...selectedFoodItem, qty_used_in_g: Number(foodItemQtyUsed)}]
      }

      if (showRecipes) {
        console.log("@#@#@#@#", selectedRecipe.recipe_items);
        mealToBeUpdated.food_items = [...mealToBeUpdated.food_items, ...selectedRecipe?.recipe_items]
      }

      const newMeals = completeLogs.logs.map((meal)=>(
        meal.meal_id === mealID ? mealToBeUpdated : meal
      ))

      const newCompleteLog = {...completeLogs}
      newCompleteLog.logs = newMeals

      const res = updateMealLog({mealLogID, ...newCompleteLog})
      console.log(res);
    }

    if (toUpdate) {
      const newFoodData = {...foodData, qty_used_in_g: Number(foodItemQtyUsed)}
      
      const food_items = mealToBeUpdated.food_items.map((foodItem)=>(
        foodItem.food_item_id===newFoodData.food_item_id ? newFoodData : foodItem
      ))

      const newMeal = {...mealToBeUpdated, food_items}

      const newMeals = completeLogs.logs.map((meal)=>(
        meal.meal_id === mealID ? newMeal : meal
      ))

      const newCompleteLog = {...completeLogs}
      newCompleteLog.logs = newMeals

      const res = updateMealLog({mealLogID, ...newCompleteLog})
      console.log(res);
    }
    
  }

  const handleMealItemDelete = async(e) => {
    console.log(e.preventDefault);
    e.preventDefault()

    const mealLogID = completeLogs.id
    const mealID = eachLog.meal_id
    
    const mealToBeUpdated = {...completeLogs.logs.filter(meal=>meal.meal_id===mealID)[0]}
    
      
    const food_items = mealToBeUpdated.food_items.filter((foodItem)=>(
      foodItem.food_item_id!==foodData.food_item_id
    ))

    const newMeal = {...mealToBeUpdated, food_items}

    const newMeals = completeLogs.logs.map((meal)=>(
      meal.meal_id === mealID ? newMeal : meal
    ))

    const newCompleteLog = {...completeLogs}
    newCompleteLog.logs = newMeals

    console.log(newCompleteLog);

    const res = updateMealLog({mealLogID, ...newCompleteLog})
    console.log(res);
    console.log("crete success", createNewLogSuccess);
  }


  // recipe handling
  const handleRecipeItemRemove = (e, index, item) => {
    e.preventDefault()
    const newRecipeItems = selectedRecipe.recipe_items.filter((_, i)=>i!==index)
    setSelectedRecipe({...selectedRecipe, recipe_items:newRecipeItems})
  }

  const handleRecieItemQtyChange = (e, index) => {
    const newRecipeItems = selectedRecipe.recipe_items.map((item, i) => {
      return i==index ? {...item, 'qty_used_in_g': Number(e.target.value)} : item
    })
    setSelectedRecipe({...selectedRecipe, recipe_items:newRecipeItems})
  }


  return (
    <div onClick={closeModal} ref={modalRef} className='fixed inset-0 min-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>

      <div className='w-full lg:w-3/12 min-h-[100vh] max-h-[100vh] bg-lightwhite flex flex-col items-center justify-start lg:rounded-3xl'>

        <h1 className='text-white text-xl text-center font-medium bg-secondary lg:rounded-t-2xl w-full h-16 pt-4'>
            {toUpdate ? "Edit Food Item" : "Add Food/Recipe"}
        </h1>

        {createNewLogSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16 mt-[40vh]'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Food Log {toUpdate ? "updated" : "added"}</h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

        {createNewLogError && <div className='my-auto flex flex-col justify-center items-center gap-16 mt-[40vh]'>
        <h1 className='text-secondary text-2xl font-medium my-auto'>
        Something went wrong!
        </h1>
        <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
        </div>}

        {(!toUpdate && (!createNewLogError && !createNewLogLoading && !createNewLogSuccess)) && <SwitchTab 
        tabName1="Food Items" 
        icon1={FoodLogo}
        tabName2="Recipes" 
        icon2={RecipeIcon}
        onClick1 = {clickFoodItemsTab}
        onClick2 = {clickRecipesTab}
        className='w-full h-20 lg:w-11/12 lg:mt-4'/>}

        <div className='w-full min-h-[70vh] px-8 py-8 flex flex-col justify-between'>
          {/* search bar and search suggestions */}
          {(!toUpdate && (!createNewLogError && !createNewLogLoading && !createNewLogSuccess)) && 
          <div className='w-full flex flex-col'>
            <Input 
            value={searchQuery}
            ref={searchRef}
            onFocus={()=>setSearchFocused(true)}
            onBlur={()=>{setTimeout(()=>(setSearchFocused(false)), 300)}}
            onChange={(e)=>(setSearchQuery(e.target.value))}
            placeholder={`Search ${showFoodItems? "Food Items" : "Recipes"}`} 
            className='w-full h-12'/>

            {(searchQuery && searchFocused) && 
            <div className='w-10/12 lg:w-[20vw] bg-extralight bg-opacity-20 mt-16 rounded-lg flex flex-col max-h-[50vh] overflow-y-scroll absolute'>
              {itemSuggestions.map((item, i)=>(
                <button key={`itemsuggest-${i}`} onClick={(e)=>(handleSelectItem(e, item))} className='border-b-[1px] border-extralight hover:bg-extralight hover:bg-opacity-40 w-full py-2 px-4 last:border-none flex flex-col items-start justify-center gap-1'>
                          <h1 className='text-md text-blackdark font-medium'>{item.name}</h1>
                          <h3 className='text-md text-blcklight font-medium'>(Serving of {item.serving_size_in_g}g)</h3>
                          <h3 className='text-md text-blcklight font-medium'>
                          Cal: {item.calories}, P: {item.protein_in_g}g, C: {item.carbs_in_g}g, F: {item.fats_in_g}g
                          </h3>

                          </button>))}
            </div>}
          </div>
          }


          {/* food item info */}
          <form className='w-full'>
            {(((itemSelected && showFoodItems) || toUpdate) && (!createNewLogError && !createNewLogLoading && !createNewLogSuccess))&& 
            <SelectedFoodItemInfo 
            selectedFoodItem={selectedFoodItem} 
            foodItemQtyUsed={foodItemQtyUsed}
            handleFoodItemQtyChange={setFoodItemQtyUsed}  
            />
            }

            {((recipeSelected && showRecipes) && (!createNewLogError && !createNewLogLoading && !createNewLogSuccess))&& 
            <h1>
            {/* show selected recipe info */}
            <FoodItemInRecipe 
            recipeItems={selectedRecipe.recipe_items} 
            handleRemove={handleRecipeItemRemove} handleQtyChange={handleRecieItemQtyChange}
            recipeName={selectedRecipe.name}
            />
            </h1>
            }

          {/* CTAs */}
            {(!createNewLogError && !createNewLogLoading && !createNewLogSuccess) && <div className='w-full h-auto flex flex-row-reverse justify-between items-center mt-16'>
              <PrimaryBtn
              value={toUpdate ? 'Update' : 'Add'}
              type='submit'
              disabled= {!toUpdate && !itemSelected && !recipeSelected}
              className='w-2/5 h-12'
              onClick={(e)=>handleCreate(e)}
              />
              <SecondaryBtn
              value='Cancel'
              type='button'
              className='w-2/5 h-12'
              onClick={onClose}
              />
              {toUpdate && 
              <button 
              type="button"
              onClick={(e)=>(handleMealItemDelete(e))}
              className='w-[48px] h-[48px] bg-primary bg-opacity-25 rounded-lg border-2 border-secondary flex items-center justify-center'>
                  <img src={DeleteIcon} className='w-[28px] h-[28px]'/>
              </button>}
            </div>}
          </form>

        </div>

      </div>

    </div>
  )
}

export default MealItemModal