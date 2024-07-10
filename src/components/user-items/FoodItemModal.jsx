import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import PrimaryBtn from '../PrimaryBtn'
import SecondaryBtn from '../SecondaryBtn'
import { useCreateFoodItemMutation, useUpdateFoodItemMutation, useDeleteFoodItemMutation } from '../../services/userItemService'
import Loader from '../Loader'
import DeleteIcon from '../../assets/icons/delete-icon.svg'

const FoodItemModal = ({
    onClose,
    toUpdate = false,
    id,
    name = '',
    cal = '',
    serving = '',
    p = '',
    c = '',
    f = '',
    s = '',
}) => {

    const itemNameRef = useRef()
    const modalRef = useRef()

    useEffect(() => {
        itemNameRef.current?.focus()
    }, [])

    const closeModal = (e) => {
        if (modalRef.current === e.target){
            onClose()
        }
    }

    const [itemName, setItemName] = useState(name)
    const [servingSize, setServingSize] = useState(serving)
    const [calories, setCalories] = useState(cal)
    const [protein, setProtein] = useState(p)
    const [carbs, setCarbs] = useState(c)
    const [fats, setFats] = useState(f)
    const [sugar, setSugar] = useState(s)

    const [createFoodItem, {isLoading, isError, error, isSuccess}] = toUpdate ? useUpdateFoodItemMutation() : useCreateFoodItemMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const foodItemInfo = {
            "name": itemName,
            "serving_size_in_g": servingSize,
            "calories": calories,
            "protein_in_g": protein,
            "carbs_in_g": carbs,
            "fats_in_g": fats,
            "sugar_in_g": sugar
        }

        if (!toUpdate){
            const res = await createFoodItem(foodItemInfo)
            console.log(res);
        }

        if (toUpdate){
            const res = await createFoodItem({id, ...foodItemInfo}).unwrap()
            console.log("food updated", res);
        }
    }

    const [deleteFoodItem, {isError:deleteErr, isSuccess:deleteSuccess}] = useDeleteFoodItemMutation()

    const handleDelete = async (e) => {
        e.preventDefault()

        const res = await deleteFoodItem(id)
        console.log("delllllll", res);
    }

  return (
    <div onClick={closeModal} ref={modalRef} className='fixed inset-0 min-h-screen max-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-40 flex justify-center items-center'>
        <div className='w-full lg:w-4/12 min-h-[100vh] bg-white border-secondary border-0 rounded-3xl flex flex-col items-center justify-start'>
            <h1 className='text-white text-xl text-center font-medium bg-secondary rounded-t-2xl w-full h-16 pt-4'>
            {toUpdate ? "Update Food Item" : "Add Food Item"}
            </h1>
            {isLoading && <Loader className='my-auto'/>}

            {isSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Food item {toUpdate ? "updated" : "created"}
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {deleteSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Food item deleted
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {(!isLoading && !isSuccess && !deleteSuccess) &&
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 justify-center items-center w-full px-8 lg:px-0 lg:w-4/5 my-8'>
                <Input type='text' ref={itemNameRef} label="Name" value={itemName} onChange={(e)=>{setItemName(e.target.value)}}/>
                <Input type='text' label="Serving Size (in g)" value={servingSize} onChange={(e)=>{setServingSize(e.target.value)}}/>
                <Input type='text' label="Calories" value={calories} onChange={(e)=>{setCalories(e.target.value)}}/>
                <div className='w-full flex flex-row flex-wrap gap-2'>
                    <Input type='text' label="Protein (in g)" parentClassName='w-2/5 mr-6' value={protein} onChange={(e)=>{setProtein(e.target.value)}}/>
                    <Input type='text' label="Carbs (in g)" parentClassName='w-2/5 mr-6' value={carbs} onChange={(e)=>{setCarbs(e.target.value)}}/>
                    <Input type='text' label="Fats (in g)" parentClassName='w-2/5 mr-6' value={fats} onChange={(e)=>{setFats(e.target.value)}}/>
                    <Input type='text' label="Sugar (in g)" parentClassName='w-2/5 mr-6' value={sugar} onChange={(e)=>{setSugar
                    (e.target.value)}}/>
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

export default FoodItemModal