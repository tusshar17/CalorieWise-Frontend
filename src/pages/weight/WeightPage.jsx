import React, { useEffect, useState } from 'react'
import AppName from '../../components/AppName'
import InsightGraph from '../../components/InsightGraph'
import BottomMenu from '../../components/BottomMenu'
import PrimaryBtn from '../../components/PrimaryBtn'
import WeightProgressPie from '../../components/weight-records/WeightProgressPie'
import WeightRecordCard from '../../components/weight-records/WeightRecordCard'
import WeightModal from '../../components/weight-records/WeightModal'
import { useGetWeightRecordsQuery } from '../../services/weightService'
import Loader from '../../components/Loader'

const WeightPage = () => {

  const [showWeightModal, setShowWeightModal] = useState(false)

  const {data:weightRecords, isError, isLoading, isSuccess, refetch} = useGetWeightRecordsQuery()
  console.log(weightRecords);

  useEffect(() => {
    console.log("manual refetch");
    refetch()
  }, [])

  return (
    <div className='bg-lightwhite min-h-screen max-h-max flex flex-col items-center justify-center'>
        <AppName className='fixed top-0 gradient-bg w-full min-h-20' showTagLine={false}/>

        {showWeightModal && <WeightModal onClose={()=>setShowWeightModal(false)}/>}

        {isLoading && <Loader/>}

        {isSuccess &&
        <div className='w-full flex flex-col items-center justify-center lg:justify-center lg:flex-row gap-4 lg:gap-0'>
          <div className='w-full lg:w-3/5 flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center px-4 lg:flex-row mt-24 w-full lg:h-[50vh] lg:w-[60vw] gap-8'>
              {/* progress pie */}
              <WeightProgressPie currentWeight={weightRecords[0].weight}/>

              {/* weight graph */}
              <InsightGraph label='Weight' borderColor='border-secondary' shadow='' className='lg:min-w-[25vw]'/>
            </div>

          {/* add weight button */}
          <PrimaryBtn 
          value='+ Add Weight' 
          className='w-[60vw] h-16 lg:w-[20vw] mt-10'
          onClick={()=>setShowWeightModal(true)}
          />
          </div>

          {/* weight records */}
          <div id='weight-records-container' className='w-11/12 h-auto lg:w-[25vw] lg:min-h-[50vh] lg:max-h-[50vh] border-2 border-white bg-white bg-opacity-40 mt-4 mb-36 lg:m-0 rounded-2xl flex flex-col justify-start items-start px-6 py-8'>
            
            <h1 className='text-xl text-blackdark font-bold mb-4'>
              Weight Records
            </h1>

            <div className='w-full lg:max-h-[36vh] overflow-y-scroll flex flex-col gap-6'>
              {weightRecords.map((record, i)=>(<WeightRecordCard recordData={record}/>))}
            </div>

          </div>

        </div>}
        <BottomMenu className='fixed bottom-0 lg:left-0 lg:top-[18vh] z-40'/>

    </div>
  )
}

export default WeightPage