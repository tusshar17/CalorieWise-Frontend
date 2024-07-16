import React from 'react'

const MealItem = () => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='w-full flex flex-row justify-between items-center'>
            <h1 className='text-blackdark text-md font-semibold'>Burger</h1>
            <h1 className='text-blackdark text-md font-semibold'>350 Cal</h1>
        </div>
        <div className='flex flex-row justify-between items-center'>
            <h3 className='text-blcklight text-md font-medium'>PCF</h3>
            <h3 className='text-blcklight text-md font-medium'>(Serivng of 300g)</h3>
        </div>
        <hr className='bg-lightwhite h-[2px]'/>
    </div>
  )
}

export default MealItem