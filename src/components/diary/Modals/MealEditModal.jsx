import { useEffect, useRef, useState } from 'react'
import Input from '../../../components/Input'
import PrimaryBtn from '../../PrimaryBtn'
import SecondaryBtn from '../../SecondaryBtn'
import Loader from '../../Loader'
import DeleteIcon from '../../../assets/icons/delete-icon.svg'
import { useCreateMealLogMutation, useUpdateMealLogMutation } from '../../../services/mealLogService'

const MealEditModal = ({
    toRename = false, // to rename or delete
    meal_logs,
    mealData,
    date,
    onClose,
}) => {

  const mealNameRef = useRef()

  const [mealName, setMealName] = useState(mealData? mealData.meal_name : '')
  const [validMealName, setValidMealName] = useState(false)

  useEffect(() => {
    mealNameRef.current.focus()
    console.log("meal edit modal loaded.....");
  }, [])

  useEffect(()=> {
    if(mealName === undefined || mealName === null || mealName === ''){
        setValidMealName(false)
    }
    else{
        setValidMealName(true)
    }
  }, [mealName])

  const modalRef = useRef()
  const closeModal = (e) => {
    if (modalRef.current === e.target){
        onClose()
    }
  }

  const [addMealLog, {isError:addError, isLoading:addLoading, isSuccess:addSuccess, error:addErrorMsg}] = useCreateMealLogMutation() 
  const [updateMealLog, {isError:updateError, isLoading:updateLoading, isSuccess:updateSuccess}] = useUpdateMealLogMutation()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(mealName === undefined || mealName === null || mealName === ''){
        return
    }

    if (!toRename) {
        
        // start a new meal log
        if (!meal_logs.logs){
            console.log("initiating new log");
            const reqData = {
                'date': date.toISOString().split('T')[0],
                'logs': [
                    {
                        'meal_name': mealName,
                        'food_items': []
                    }
                ]
            }
        
            const res = await addMealLog(reqData)
            console.log("started a new log", res);
        }

        // add a new meal into existing log
        else {
            console.log("add a new meal into existing log");
            const newMeal = {
                'meal_name': mealName,
                'food_items': []
            }

            const existingLog = meal_logs.logs
            console.log("existing logs", existingLog);
            const newLog = {...meal_logs}
            newLog.logs = [...existingLog, newMeal]
            const mealLogID = meal_logs.id
            console.log("meal id", mealLogID);
            console.log("meal Logs new", newLog);
            const res = await updateMealLog({mealLogID, ...newLog}).unwrap()
            console.log("new meal added into existing log", res); 
        }
    }

    if (toRename) {
        console.log(mealData);
        console.log(meal_logs);
        const mealId = mealData.meal_id
        const existingLog = meal_logs.logs
        const newLogs = {...meal_logs}
        newLogs.logs = existingLog.map((log, i)=>{
            console.log(log.meal_id);
            if (log.meal_id == mealId) {
                console.log("renaming");
                log = {...log, "meal_name": mealName}
                return log
            } 
            else {
                return log
            } 
        })
        console.log("renamed", newLogs);
        const mealLogID = meal_logs.id
        const res = await updateMealLog({mealLogID, ...newLogs})
        console.log("rename pushed", res);
    }
    
  }

  const handleDelete = async(e) => {
    e.preventDefault()
    console.log("delete");
    const mealId = mealData.meal_id
    const existingLog = meal_logs.logs
    const newLogs = {...meal_logs}
    newLogs.logs = existingLog.filter((log)=>log.meal_id!==mealId)
    console.log("deleting", newLogs);
    const mealLogID = meal_logs.id
    const res = await updateMealLog({mealLogID, ...newLogs})
    console.log("delete pushed", res);
    console.log("isSuccess", );
  }

  return (
    <div onClick={closeModal} ref={modalRef} className='fixed inset-0 min-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>
        <div className='w-10/12 lg:w-3/12 min-h-[70vh] bg-lightwhite border-secondary border-2 flex flex-col items-center justify-between rounded-3xl'>

            <h1 className='text-white text-xl text-center font-medium bg-secondary rounded-t-2xl w-full h-16 pt-4'>
                {toRename ? "Edit Meal" : "Create Meal"}
            </h1>

            {(addSuccess || updateSuccess) && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Meal log {toRename ? "updated" : "created"}</h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {(addError || updateError) && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Something went wrong!
            {addErrorMsg && <h1 className='text-blackdark'>{addErrorMsg[0]}</h1>}
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {(addLoading || updateLoading) && <Loader className='my-auto'/>}

            {(!addLoading && !addSuccess && !addError && !updateLoading && !updateSuccess && !updateError) && 
            <form className='w-full h-[30vh] my-auto flex flex-col gap-4 items-center justify-center' onSubmit={handleSubmit}>
                <Input 
                ref={mealNameRef}
                label="Meal Name" 
                placeholder="Breakfast"
                type="text" 
                value={mealName}
                onChange={(e)=>(setMealName(e.target.value))}
                parentClassName="w-3/4 lg:w-2/4" 
                flexDirection='flex-col'
                className="w-full"/>

                <div className='w-10/12 mt-6 flex flex-row flex-wrap gap-4 justify-around'>
                    <PrimaryBtn
                    type="submit"
                    value={toRename ? "Save" : "Create"} 
                    disabled={!validMealName}
                    className='w-3/4 h-12 mb-2'/>
                    <SecondaryBtn value="Cancel" onClick={onClose} className='w-1/2 h-12'/>
                    {toRename && 
                    <button 
                    type="button"
                    onClick={(e)=>(handleDelete(e))}
                    className='w-[48px] h-[48px] bg-primary bg-opacity-25 rounded-lg border-2 border-secondary flex items-center justify-center'>
                        <img src={DeleteIcon} className='w-[28px] h-[28px]'/>
                    </button>}
                    
                </div>
            </form>}
        </div>
    </div>
  )
}

export default MealEditModal