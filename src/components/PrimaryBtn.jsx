import React from 'react'
import Loader from './Loader'

function PrimaryBtn({
    value = "Submit", 
    className = "",
    isLoading = false,
    textSize = "text-xl",
    ...props
}) {
  return (
        <button 
        className={`bg-secondary border-primary border-2 rounded-full ${textSize} font-medium ${className}`}
        {...props}>
        {!isLoading && value}
        {isLoading && <Loader/>}
        </button>
  )
}

export default PrimaryBtn