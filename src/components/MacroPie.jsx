import React from 'react'
import DonutChart from './graphs/DoughnutChart'

function MacroPie({
    name,
    value = '-',
    goal = '-'
}) {
  return (
    <div className='w-2/5 h-2/5 relative mt-4'>
      <DonutChart goalVal={goal} val={value}/>
      <div className='w-[86%] h-[86%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-white rounded-full'>
        <h2 className='text-blcklight text-sm lg:text-md font-semibold z-10'>{name}</h2>
        <h1 className='text-blackdark text-md lg:text-lg font-bold z-10'>{Number(value).toFixed(0)}g</h1>
        <h2 className='text-blcklight text-sm lg:text-md font-semibold z-10'>of {goal}g</h2>
      </div>
    </div>
  )
}

export default MacroPie