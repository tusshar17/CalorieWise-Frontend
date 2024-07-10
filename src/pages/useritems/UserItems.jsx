import React, { useEffect, useState } from 'react'
import AppName from '../../components/AppName'
import SwitchTab from '../../components/SwitchTab'
import BottomMenu from '../../components/BottomMenu'
import FoodLogo from '../../assets/icons/food.png'
import RecipeIcon from '../../assets/icons/recipe-icon.svg'
import UserItemCard from '../../components/user-items/UserItemCard'
import PrimaryBtn from '../../components/PrimaryBtn'
import {useGetFoodItemsQuery, userItemApi, useGetRecipesQuery} from '../../services/userItemService'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import FoodItemModal from '../../components/user-items/FoodItemModal'
import RecipeItemModal from '../../components/user-items/RecipeItemModal'
import RecipeItemCard from '../../components/user-items/RecipeItemCard'
 
function UserItems() {

  const dispatch = useDispatch()

  const [showFoodItems, setShowFoodItems] = useState(true)
  const [showRecipes, setShowRecipes] = useState(false)

  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false)


  const clickFoodItemsTab = (e) => {
    setShowFoodItems(true)
    setShowRecipes(false)
  }

  const clickRecipesTab = (e) => {
    setShowFoodItems(false)
    setShowRecipes(true)
  }

  const createNew = ()=>{
    setShowAddItemModal(false)
    setShowAddRecipeModal(false)
    showFoodItems ? setShowAddItemModal(true) : null;
    showRecipes ? setShowAddRecipeModal(true) : null
    }

  const {data:foodItemData, error, isLoading, refetch} = useGetFoodItemsQuery();
  console.log(foodItemData);
  console.log("isloading", isLoading);

  const {data:recipeData} = useGetRecipesQuery()
  console.log("rd", recipeData);

  // useEffect(async()=>{
  //   const res = dispatch(userItemApi.endpoints.getFoodItems.initiate())
  //   console.log("fdata", res);
  // }, [])


  

  return (
    <div className='bg-lightwhite min-h-screen max-h-max flex flex-col items-center'>

      <AppName className='fixed top-0 gradient-bg w-full min-h-20' showTagLine={false}/>

      <SwitchTab 
      tabName1="Food Items" 
      icon1={FoodLogo}
      tabName2="Recipes" 
      icon2={RecipeIcon}
      onClick1 = {clickFoodItemsTab}
      onClick2 = {clickRecipesTab}
      className=''/>

      {error && <h2 className='text-blcklight mt-32 text-center'>Something went wrong!</h2>}

      {!error && <>

        <PrimaryBtn
        value='+ Create New' 
        className='w-[40vw] h-12 lg:w-2/12 mt-8'
        onClick={createNew}
        />

      {isLoading && <Loader className='mt-12'/>}


        {(showAddItemModal && showFoodItems) && <FoodItemModal toUpdate={false} onClose={()=>{setShowAddItemModal(false)}}/>}

        {(showAddRecipeModal && showRecipes) && <RecipeItemModal toUpdate={false} onClose={()=>{setShowAddRecipeModal(false)}}/>}

        {showFoodItems && <div id='food-items-container' className='w-full flex flex-col justify-center items-center mt-8 mb-20'>
            {foodItemData?.map((foodItem, index) => (
              <div key={`food-item-${index}`} className='w-[90vw] lg:w-1/3'>
              <UserItemCard 
              id={foodItem.id} 
              name={foodItem.name} 
              cal={foodItem.calories}
              servingSize={foodItem.serving_size_in_g}  
              protein={foodItem.protein_in_g}
              carbs={foodItem.carbs_in_g}
              fats={foodItem.fats_in_g}
              sugar={foodItem.sugar_in_g}
              />
              </div>
            ))}
        </div>}

        {showRecipes && <div id='recipe-items-container' className='w-full flex flex-col justify-center items-center mt-8 mb-20'>
          <div key={`food-item`} className='w-[90vw] lg:w-1/3'>
          {recipeData.map((recipe, index)=>(<div key={`recipe-${index}`}><RecipeItemCard recipeData={recipe}/></div>))}
          </div>
        </div>}

      </>}

        <BottomMenu className='fixed bottom-0 lg:left-0 lg:top-[18vh] z-40'/>
      
      
    </div>
  )
}

export default UserItems