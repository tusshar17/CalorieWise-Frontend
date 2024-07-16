import React from 'react'

function MacroSummary({
    name,
    goal,
    val,
    showGoal = true
}) {
  return (
    <div className='flex flex-col justify-center items-center gap-1'>
        <h4 className='text-blcklight text-md font-medium'>{name}</h4>
        <h2 className='text-blackdark text-lg font-semibold'>{val}g</h2>
        {showGoal && <h4 className='text-blcklight text-md font-medium'>of {goal}g</h4>}
    </div>
  )
}

export default MacroSummary