import React, { useState } from 'react'
import WeightModal from './WeightModal'

const WeightRecordCard = ({
  recordData
}) => {

  const dateTime = new Date(recordData?.created_at) 

  const [showEditWeightModal, setShowEdiWeightModal] = useState(false)

  return (
    <>

    {showEditWeightModal && 
    <WeightModal 
    toUpdate={true} 
    weightRecord={recordData}
    onClose={()=>(setShowEdiWeightModal(false))}/>}

    <button 
    id={`weight-record-${recordData?.id}`} 
    key={`weight-record-${recordData?.id}`} 
    onClick={()=>(setShowEdiWeightModal(true))}
    className='flex flex-row justify-between items-center w-full border-lightwhite border-b-2 pr-4'>
                
        <div className='flex flex-col justify-start items-start gap-1'>
            <h2 className='text-lg text-blackdark font-normal'>{dateTime.toDateString()}</h2>
            <h3 className='text-sm text-blcklight font-normal'>at {dateTime.toLocaleTimeString()}</h3>
        </div>

        <h2 className='text-lg text-blackdark font-medium'>{recordData?.weight} Kgs</h2>

    </button>
    </>
  )
}

export default WeightRecordCard