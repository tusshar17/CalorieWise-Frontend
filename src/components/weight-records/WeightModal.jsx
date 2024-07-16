import React, { useRef, useState } from 'react'
import Input from '../Input'
import PrimaryBtn from '../PrimaryBtn'
import SecondaryBtn from '../SecondaryBtn'
import Loader from '../../components/Loader'
import { useCreateWeightRecordMutation, useDeleteWeightRecordMutation, useUpdateWeightRecordMutation } from '../../services/weightService'
import DeleteIcon from '../../assets/icons/delete-icon.svg'

const WeightModal = ({
    toUpdate = false,
    onClose,
    weightRecord,
}) => {

    const weightModalRef = useRef()

    const formattedDate = weightRecord ? new Date(weightRecord.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    const [weight, setWeight] = useState(weightRecord ? weightRecord.weight : '')
    const [date, setDate] = useState(formattedDate)

    const [validationErr, setValidationErr] = useState('')


    const [addWeight, {isLoading, isError, error, isSuccess}] = toUpdate ? useUpdateWeightRecordMutation() : useCreateWeightRecordMutation() 

    const handleSubmit = async(e) => {
        e.preventDefault()
        setValidationErr('')
        const weightInfo = {
            "weight": weight,
            "created_at": date
        }

        // validation
        if (weight === null || weight ===undefined || isNaN(weight) || weight===''){
            setValidationErr("Please enter a valid weight")
            return
        }

        if (!date){
            setValidationErr("Please select a date")
            return
        }

        const currentDate = new Date()
        const [year, month, day] = date.split('-')
        const dateToCompare = new Date(`${year}-${month}-${day}`)
        console.log("datedate", dateToCompare>currentDate);

        if (dateToCompare > currentDate){
            setValidationErr("Wait a minute! You know how much you are gonna weight in future? If no, then please select a valid date 😂")
            return
        }

        if (!toUpdate){
            const res = await addWeight(weightInfo)
            console.log(res);
        }

        if (toUpdate){
            const recordID = weightRecord.id
            const res = await addWeight({recordID, ...weightInfo}).unwrap()
        }
    }

    const [deleteWeightRecord, {isError:deleteErr, isSuccess:deleteSuccess}] = useDeleteWeightRecordMutation()

    const handleDelete = async(e) => {
        e.preventDefault()
        const res = await deleteWeightRecord(weightRecord.id)
        console.log(res);
    }

    const closeModal = (e) => {
        if (weightModalRef.current === e.target){
            onClose()
        }
    }


  return (
    <div ref={weightModalRef} onClick={closeModal} className='fixed inset-0 min-h-screen bg-blcklight bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center'>
        <div className='w-10/12 lg:w-3/12 min-h-[50vh] bg-lightwhite border-secondary border-2 flex flex-col items-center justify-between rounded-3xl'>
        
            <h1 className='text-white text-xl text-center font-medium bg-secondary rounded-t-2xl w-full h-16 pt-4'>
                {toUpdate ? "Update Weight" : "Add Weight"}
            </h1>

            {validationErr && <h2 className='text-xl text-center text-blcklight font-normal mt-8'>{validationErr}</h2>}

            {isSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Weight {toUpdate ? "updated" : "created"}</h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {deleteSuccess && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Weight Record Deleted
            </h1>
            <PrimaryBtn value='Ok' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {(isError || deleteErr) && <div className='my-auto flex flex-col justify-center items-center gap-16'>
            <h1 className='text-secondary text-2xl font-medium my-auto'>
            Some error occured 🥺
            </h1>

            <PrimaryBtn value='Close' className='w-36 h-12' onClick={()=>(onClose())}/>
            </div>}

            {isLoading && <Loader className='my-auto'/>}

            {(!isLoading && !isSuccess && !deleteSuccess && !isError) && <form className='w-full h-[30vh] my-auto flex flex-col gap-4 items-center justify-center' onSubmit={handleSubmit}>
                <Input 
                label="Weight (Kgs)" 
                type="number" 
                value={weight}
                onChange={(e)=>(setWeight(e.target.value))}
                parentClassName="w-3/4 lg:w-2/4" 
                flexDirection='flex-col'
                className="w-full"/>

                <Input
                label="Date"
                type="date"
                value={date}
                onChange={(e)=>(setDate(e.target.value))}
                parentClassName="w-3/4 lg:w-2/4" 
                flexDirection='flex-col'
                className="w-full"
                />

                <div className='w-10/12 mt-6 flex flex-row justify-around'>
                {toUpdate && 
                    <button 
                    onClick={handleDelete}
                    className='w-[48px] h-[48px] bg-primary bg-opacity-25 rounded-lg border-2 border-secondary flex items-center justify-center'>
                        <img src={DeleteIcon} className='w-[28px] h-[28px]'/>
                    </button>}
                <SecondaryBtn value="Cancel" onClick={onClose} className='w-1/3 h-12'/>
                <PrimaryBtn
                value={toUpdate ? "Update" : "Add"} 
                className='w-1/3 h-12'/>
                </div>
            </form>}

        </div>
    </div>
  )
}

export default WeightModal