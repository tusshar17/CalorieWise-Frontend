import React from 'react'

function AppName({
    showTagLine=true,
    className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
    <h1 className='text-3xl font-medium'>CalorieWise</h1>
    {showTagLine && <h3 className='text-lg font-medium mt-1'>Go CalorieWise, Go Healthy.</h3>}
    </div>
  )
}

export default AppName