import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import PrimaryBtn from '../PrimaryBtn'
import SecondaryBtn from '../SecondaryBtn'
import { useCreateRecipeMutation, useDeleteRecipeMutation, useUpdateRecipeMutation } from '../../services/userItemService'
import Loader from '../Loader'
import DeleteIcon from '../../assets/icons/delete-icon.svg'
import SearchFoodItems from './SearchFoodItems'
import FoodItemInRecipe from './FoodItemInRecipe'

const RecipeItemModal = ({
    toUpdate = false,
    recipeData,
    onClose,
}) => {

    const recipeNameRef = useRef()
    const recipeModalRef = useRef()

    useEffect(() => {
        recipeNameRef.current?.focus()
    }, [])

    const closeModal = (e) => {
        if (recipeModalRef.current === e.target){
            onClose()
        }
    }

    const [recipeName, setRecipeName] = useState(recipeData ? recipeData.name : "")
    const [recipeItems, setRecipeItems] = useState(recipeData ? recipeData.recipe_items : [])

    const [createRecipe, {isLoading, isError, error, isSuccess}] = toUpdate ? useUpdateRecipeMutation() : useCreateRecipeMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const recipeInfo = {
            "name": recipeName,
            "recipe_items": recipeItems
        }

        if (!toUpdate){
            const res = await createRecipe(recipeInfo)
            console.log(res);
        }

        if (toUpdate){
            const recipeID = recipeData.id
            console.log("recipe id to be updated:", recipeID);
            const res = await createRecipe({recipeID, ...recipeInfo}).unwrap()
            console.log("food updated", res);
        }
    }

    const [deleteFoodItem, {isError:deleteErr, isSuccess:deleteSuccess}] = useDeleteRecipeMutation()

    const handleDelete = async (e) => {
        e.preventDefault()

        const res = await deleteFoodItem(recipeData.id)
        console.log("delllllll", res);
    }

  return (
    <div onClick={closeModal} ref={recipeModalRef} className='fixed inset-0 min-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>
        <div className='w-full lg:w-4/12 min-h-[100vh] bg-lightwhite border-secondary border-0 flex flex-col items-center justify-start'>
            
            <h1 className='text-white text-xl text-center font-medium bg-secondary w-full h-16 pt-4'>
            {toUpdate ? "Update Recipe" : "Add Recipe"}
            </h1>

            {isLoading && <Loader className='my-auto'/>}

            {isSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Recipe {toUpdate ? "updated" : "created"}
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {deleteSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Recipe Deleted
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {(!isLoading && !isSuccess && !deleteSuccess) &&
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 justify-between items-start w-full min-h-[70vh] px-8 lg:px-0 lg:w-4/5 my-8'>
                <div className='flex flex-col justify-center items-center w-full gap-6'>
                    <Input type='text' ref={recipeNameRef} parentClassName="w-full items-start" className="w-11/12 h-12" label="Name" value={recipeName} onChange={(e)=>{setRecipeName(e.target.value)}}/>

                    <SearchFoodItems setRecipeItems={setRecipeItems} recipeItems={recipeItems}/>
                </div>

                
                <div className='w-full h-auto flex flex-row-reverse justify-between items-center mt-8'>
                    <PrimaryBtn
                    value={toUpdate ? 'Save' : 'Create'}
                    type='submit'
                    className='w-2/5 h-12'
                    />
                    <SecondaryBtn
                    value='Cancel'
                    className='w-2/5 h-12'
                    onClick={onClose}
                    />
                    {toUpdate && 
                    <button 
                    onClick={handleDelete}
                    className='w-[48px] h-[48px] bg-primary bg-opacity-25 rounded-lg border-2 border-secondary flex items-center justify-center'>
                        <img src={DeleteIcon} className='w-[28px] h-[28px]'/>
                    </button>}
                </div>
            </form>}
        </div>
    </div>
  )
}

export default RecipeItemModal