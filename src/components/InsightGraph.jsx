import React, { useState } from 'react'
import SecondaryBtn from './SecondaryBtn'

function InsightGraph({
    label = ""
}) {

    const [timeInterval, setTimeInterval] = useState()

  return (
    <div className='w-full h-[36vh] lg:w-[28vw] lg:h-[50vh] bg-white shadow-2xl shadow-blcklight border-2 border-lightwhite px-4 py-6 rounded-3xl flex flex-col justify-between'>
        <div className='w-full h-1/5 flex flex-row items-center justify-between'> 
            <h1 id='graph-label' className='text-blackdark text-2xl font-bold'>{label}</h1>
            <select 
            className='px-3 py-2 rounded-xl text-lg font-semibold bg-white outline-none focus:bg-green-50 duration-200 border-2 border-secondary text-secondary w-2/5 h-12' 
            id='gender' 
            value={timeInterval} 
            onChange={(e)=>{setTimeInterval(e.target.value)}}>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="all time">All Time</option>
            </select>
        </div>

        <div className='w-full h-3/4 bg-blcklight bg-opacity-30'></div>
    </div>
  )
}

export default InsightGraph