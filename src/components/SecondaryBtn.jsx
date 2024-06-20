import React from 'react'

function SecondaryBtn({
    value = "Submit",
    className = ""
}) {
  return (
    <button 
        className={`bg-white w-full h-12 border-secondary border-2 rounded-full text-xl text-secondary font-medium lg:w-3/4 ${className}`}>
        {value}
    </button>
  )
}

export default SecondaryBtn