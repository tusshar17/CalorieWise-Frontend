import { useRef, useState } from 'react'
import Input from '../../../components/Input'
import PrimaryBtn from '../../PrimaryBtn'
import SecondaryBtn from '../../SecondaryBtn'
import DeleteIcon from '../../../assets/icons/delete-icon.svg'
import { useCreateMealLogMutation, useUpdateMealLogMutation } from '../../../services/mealLogService'

const MealEditModal = ({
    toRename = false, // to rename and delete
    meal_logs,
    mealData,
    date,
    onClose,
}) => {

  const [mealName, setMealName] = useState(mealData?.meal_name)

  const modalRef = useRef()
  const closeModal = (e) => {
    if (modalRef.current === e.target){
        onClose()
    }
  }

  const [addMealLog, {isError, isLoading, isSuccess}] = (!meal_logs.logs) ? useCreateMealLogMutation() : useUpdateMealLogMutation()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!toRename) {
        // start a new meal log
        if (!meal_logs.logs){
            console.log("initiating new log");
            const reqData = {
                'date': date,
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
            const res = await addMealLog({mealLogID, ...newLog}).unwrap()
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
        const res = await addMealLog({mealLogID, ...newLogs})
        console.log("rename pushed", res);
    }
    
  }

  const handleDelete = () => {
    console.log("delete");
  }

  return (
    <div onClick={closeModal} ref={modalRef} className='fixed inset-0 min-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>
        <div className='w-10/12 lg:w-3/12 min-h-[50vh] bg-lightwhite border-secondary border-2 flex flex-col items-center justify-between rounded-3xl'>

            <h1 className='text-white text-xl text-center font-medium bg-secondary rounded-t-2xl w-full h-16 pt-4'>
                {toRename ? "Edit Meal" : "Create Meal"}
            </h1>

            {isSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Meal log {toRename ? "updated" : "created"}</h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {!isSuccess && <form className='w-full h-[30vh] my-auto flex flex-col gap-4 items-center justify-center' onSubmit={handleSubmit}>
                    <Input 
                    label="Meal Name" 
                    type="text" 
                    value={mealName}
                    onChange={(e)=>(setMealName(e.target.value))}
                    parentClassName="w-3/4 lg:w-2/4" 
                    flexDirection='flex-col'
                    className="w-full"/>


                    <div className='w-10/12 mt-6 flex flex-row justify-around'>
                    {toRename && 
                        <button 
                        onClick={handleDelete}
                        className='w-[48px] h-[48px] bg-primary bg-opacity-25 rounded-lg border-2 border-secondary flex items-center justify-center'>
                            <img src={DeleteIcon} className='w-[28px] h-[28px]'/>
                        </button>}
                    <SecondaryBtn value="Cancel" onClick={onClose} className='w-1/3 h-12'/>
                    <PrimaryBtn
                    type="submit"
                    value={toRename ? "Update" : "Create"} 
                    className='w-1/3 h-12'/>
                    </div>
            </form>}
        </div>
    </div>
  )
}

export default MealEditModal