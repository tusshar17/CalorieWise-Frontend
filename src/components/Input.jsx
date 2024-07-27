import React, { forwardRef, useId } from 'react'

const Input = forwardRef((
    {label,
    type = "text",
    className = "",
    parentClassName = "w-full",
    flexDirection = "flex-col",
    ...props},
    ref
) => {

    const id = useId()

    return (
        <div className={`flex ${flexDirection} ${parentClassName}`}>
            {label && <label className='inline-block pl-2 text-secondary text-lg font-medium' htmlFor={id}>
            {label}
            </label>
            }

            <input
                type={type}
                ref={ref}
                className={`px-3 py-2 bg-lightwhite bg-opacity-0 outline-none duration-200 border-b-2 border-extralight focus:border-secondary text-secondary font-semibold  ${className}`}
                {...props}
                id={id}
                autoComplete="off"
            />
        </div>
    )
})

export default Input