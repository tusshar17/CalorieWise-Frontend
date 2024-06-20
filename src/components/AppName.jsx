import React from 'react'

function AppName({
    showTagLine=true,
    className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
    <h1 className='text-4xl mt-4'>CalorieWise</h1>
    {showTagLine && <h3 className='text-xl mt-1'>Go CalorieWise, Go Healthy.</h3>}
    </div>
  )
}

export default AppName