import {useState} from 'react'
import FoodItemModal from './FoodItemModal'

function UserItemCard({
  id = 0,
  name = "",
  servingSize = 0,
  cal = 0,
  protein = 0, 
  carbs = 0, 
  fats = 0,
  sugar = 0,
}) {


const [showEditItemModal, setShowEditItemModal] = useState(false)

  return (
    <>
    {(showEditItemModal) && 
    <FoodItemModal 
    toUpdate={true} 
    id={id}
    name={name}
    serving={servingSize}
    cal={cal}
    p={protein}
    c={carbs}
    f={fats}
    s={sugar}
    onClose={()=>{setShowEditItemModal(false)}}/>}
    
    <button onClick={()=>{setShowEditItemModal(true)}} className=' bg-white w-full h-auto mb-4 p-4 lg:p-6 lg:hover:bg-extralight lg:hover:bg-opacity-20 ease-in-out duration-200 rounded-2xl flex flex-col gap-2 shadow-white shadow-sm'>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-1 items-start w-full'>
            <h2 className='text-lg text-secondary font-medium'>{name}</h2>
            <h3 className='text-md text-blcklight font-medium'>(Serving of {servingSize}g)</h3>
        </div>
        <h3 className='text-md text-blcklight font-medium'>Cal: {cal}, P: {protein}g, C: {carbs}g, F: {fats}g</h3>
    </button>
    </>
  )
}

export default UserItemCard







