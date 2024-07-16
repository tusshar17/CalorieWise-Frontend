import React from 'react'
import weightLogo from '../../assets/icons/weight-machine.png'
import goaLogo from '../../assets/icons/goal.png'

const WeightProgressPie = ({
    startedWeight=50,
    goalWeight=60,
    currentWeight=55
}) => {

  const shouldGain = goalWeight > currentWeight
  const progress = shouldGain ? (currentWeight - startedWeight) : (startedWeight - currentWeight)
  return (
    <div className='w-full lg:w-2/5 h-[32vh] lg:h-[50vh] border-2 border-secondary bg-white rounded-xl px-4 py-6 flex flex-col gap-2 items-start justify-center'>

        <div id='pie-container' className='w-full h-3/4 flex flex-col justify-center items-center'>
            
            <div id='pie' className='bg-extralight bg-opacity-25 w-[80%] h-4/5 lg:h-2/4 flex flex-col items-center justify-center gap-1 rounded-t-full border-[8px] border-b-0 border-secondary'>
                <img src={weightLogo} className='h-1/4'/>
                <h1 className='text-secondary text-xl font-semibold mt-2'>{currentWeight} Kgs</h1>
                <h1 className='text-secondary text-md font-medium'>Current Weight</h1>
            </div>

            <div className='w-full flex flex-row justify-between px-4'>
                <h1 className='text-secondary text-md font-medium text-center'>Started at <br/>{startedWeight} Kgs</h1>
                <h1 className='text-secondary text-md font-medium text-center'>Goal <br/> {goalWeight} Kgs</h1>
            </div>

        </div>

        <div className='w-full h-1/4 flex flex-col items-center justify-center gap-2'>
            <img src={goaLogo} className='h-1/2'/>
            <h2 className='text-secondary text-md font-medium'>You have {shouldGain?'gained':'lost'} {progress} Kgs so far!</h2>
        </div>
    </div>
  )
}

export default WeightProgressPie