import React from 'react'
import Loader from './Loader'

function PrimaryBtn({
    value = "Submit", 
    className = "",
    isLoading = false,
    ...props
}) {
  return (
        <button 
        className={`bg-secondary rounded-full text-xl font-medium ${className}`}
        {...props}>
        {!isLoading && value}
        {isLoading && <Loader/>}
        </button>
  )
}

export default PrimaryBtn