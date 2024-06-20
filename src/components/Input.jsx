import React, { useId } from 'react'

function Input(
    {label,
    type = "text",
    className = "",
    ...props}
) {

    const id = useId()

    return (
        <div className='w-full flex flex-col'>
            {label && <label className='inline-block pl-2 text-secondary text-l font-medium' htmlFor={id}>
            {label}
            </label>
            }

            <input
                type={type}
                className={`px-3 py-2 rounded-xl bg-white outline-none focus:bg-lightwhite duration-200 border-2 border-secondary text-secondary font-semibold w-full h-12 lg:w-3/4 ${className}`}
                {...props}
                id={id}
            />
        </div>
    )
}

export default Input