import React from 'react'

function SecondaryBtn({
    value = "Submit",
    className = "",
    icon,
    ...props
}) {
  return (
    <button 
        className={`bg-primary bg-opacity-15 border-secondary border-2 hover:bg-secondary hover:bg-opacity-25 rounded-full text-xl text-secondary font-medium flex flex-row justify-center items-center gap-4 ${className}`} {...props}>
        {icon && <img src={icon} className='w-1/6 h-auto'/>}
        {value}
    </button>
  )
}

export default SecondaryBtn