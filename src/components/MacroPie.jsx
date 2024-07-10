import React from 'react'

function MacroPie({
    name,
    value = '-',
    goal = '-'
}) {
  return (
    <div id='protein' className='bg-white p-2 w-2/5 h-2/5 rounded-full flex flex-col justify-center items-center circular-progress' style={{'--value':(value/goal)*100}}>
        <h2 className='text-blcklight text-md font-semibold z-10'>{name}</h2>
        <h1 className='text-blackdark text-lg font-bold z-10'>{value}g</h1>
        <h2 className='text-blcklight text-md font-semibold z-10'>of {goal}g</h2>
    </div>
  )
}

export default MacroPie