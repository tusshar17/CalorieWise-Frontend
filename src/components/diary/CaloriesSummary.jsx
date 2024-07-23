import React from 'react'

function CaloriesSummary({
    icon,
    name,
    val
}) {
  return (
    <div id='goal-cal-diary' className='w-full h-1/3 flex flex-row justify-between items-center'>
        <div className='w-1/2 flex flex-row justify-start items-center gap-2'>
            <img src={icon} className='w-1/6 h-auto'/>
            <h2 className='text-blcklight text-lg font-medium'>{name}</h2>
        </div>
        <h1 className='text-blackdark text-lg font-semibold'>{Number(val).toLocaleString()} Cal</h1>
    </div>
  )
}

export default CaloriesSummary