import React from 'react'
import Loader from './Loader'

function PrimaryBtn({
    value = "", 
    className = "",
    isLoading = false,
    textSize = "text-md",
    icon,
    ...props
}) {
  return (
        <button 
        className={`flex flex-row items-center justify-center bg-secondary border-primary border-2 rounded-full ${textSize} font-medium ${className} disabled:opacity-60`}
        {...props}>

        {(!isLoading && icon) && 
        <img src={icon} className='h-[90%] w-[]'/>
        }

        {!isLoading && value}

        {isLoading && <Loader/>}

        </button>
  )
}

export default PrimaryBtn