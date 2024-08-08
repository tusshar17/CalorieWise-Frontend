import React, { useEffect, useState } from 'react'
import LineChart from './graphs/LineChart'
import BarChart from './graphs/BarChart'
import { useGetMacroSummaryQuery } from '../services/mealLogService'
import { useGetWeightRecordsSummaryQuery } from '../services/weightService'
import Loader from './Loader'

function InsightGraph({
    label = "",
    entity,
    shadow = "shadow-2xl shadow-blcklight",
    borderColor = "border-lightwhite",
    className = ""
}) {

    const [timeInterval, setTimeInterval] = useState(7)

    const {data:macroSummary, isLoading, isError, isSuccess, refetch} = useGetMacroSummaryQuery(Number(timeInterval))

    const {data:weightSummary, isLoading:weightLoading, isError:weightError, isSuccess:weightSuccess} = useGetWeightRecordsSummaryQuery(Number(timeInterval))
    
    useEffect(()=>{
        console.log("fsdjhf", timeInterval);
        console.log("fsdjhf", macroSummary);
        console.log("weightsumm", weightSummary);
    }, [timeInterval])

  return (
    <div className={`w-full h-[36vh] lg:w-[28vw] lg:h-[50vh] bg-white ${shadow} border-2 ${borderColor} px-4 py-6 rounded-3xl flex flex-col justify-between ${className}`}>
        <div className='w-full h-1/5 flex flex-row items-center justify-between'> 
            <h1 id='graph-label' className='text-blackdark text-xl font-bold'>{label}</h1>
            <select 
            className='px-3 py-2 rounded-xl text-md font-semibold bg-white outline-none focus:bg-green-50 duration-200 border-2 border-secondary text-secondary w-2/5 h-12' 
            id='gender' 
            value={timeInterval} 
            onChange={(e)=>{setTimeInterval(e.target.value)}}>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="365">Last 52 weeks</option>
            </select>
        </div>

        <div className='w-full h-3/4'>

            {(isLoading || weightLoading) && <Loader/>}

            { ((entity=="calories" || entity=="macros") && timeInterval==365 && isSuccess) && <LineChart dataSet={macroSummary} timeInterval={Number(timeInterval)} entity={entity}/>}

            { ((entity=="calories" || entity=="macros") && (timeInterval==7 ||timeInterval==30) && isSuccess) && <BarChart dataSet={macroSummary} timeInterval={Number(timeInterval)} entity={entity}/>}

            { ((entity=="weight") && timeInterval==365 && weightSuccess) && <LineChart dataSet={weightSummary} timeInterval={Number(timeInterval)} entity={entity}/>}

            { ((entity=="weight") && (timeInterval==7 || timeInterval==30) && weightSuccess) && <BarChart dataSet={weightSummary} timeInterval={Number(timeInterval)} entity={entity}/>}
        </div>
    </div>
  )
}

export default InsightGraph