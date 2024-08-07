import React, { useEffect, useState } from 'react'
import PrimaryBtn from '../../components/PrimaryBtn'
import Input from '../../components/Input'
import {useCreateGoalMutation} from "../../services/goalService"
import { useDispatch } from 'react-redux'
import { setGoal } from '../../features/goalSlice'
import { useNavigate } from 'react-router-dom'
import SecondaryBtn from '../SecondaryBtn'


const validateValue = (val) => {
    const num = Number(val)
    return ((num>1 && num<999) && (typeof num === "number" && !isNaN(num)))
}

const GoalSettingForm = ({
    toUpdate = false,
    goalData,
    closeModal,
    updateGoal,
    updateGoalLoading
}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [age, setAge] = useState(goalData ? goalData.age : '')
    const [validAge, setValidAge] = useState(false)
    const [ageFocus, setAgeFocus] = useState(false)

    const [height, setHeight] = useState(goalData ? goalData.height_in_inches : '')
    const [validHeight, setValidHeight] = useState(false)
    const [heightFocus, setHeightFocus] = useState(false)

    const [weight, setWeight] = useState(goalData ? goalData.starting_weight_in_kg : '')
    const [validWeight, setValidWeight] = useState(false)
    const [weightFocus, setWeightFocus] = useState(false)

    const [goalWeight, setGoalWeight] = useState(goalData ? goalData.goal_weight : '')
    const [validGoalWeight, setValidGoalWeight] = useState(false)
    const [goalWeightFocus, setGoalWeightFocus] = useState(false)

    const [pal, setPal] = useState(goalData ? goalData.pal : '')

    const [weeklyGoal, setWeeklyGoal] = useState(goalData ? goalData.weekly_goal : '')

    const [gender, setGender] = useState(goalData ? goalData.gender : '')

    const [errMsg, setErrMsg] = useState('')


    useEffect(() => {
        setValidAge(validateValue(age))
    }, [age])

    useEffect(() => {
        setValidHeight(validateValue(height))
    }, [height])

    useEffect(() => {
        setValidWeight(validateValue(weight))
    }, [weight])

    useEffect(() => {
        setValidGoalWeight(validateValue(goalWeight))
    }, [goalWeight])


    // handle submit
    const [createGoal, {isLoading: createGoalLoading}] = useCreateGoalMutation()


    const handleSubmit = async (e) => {
        e.preventDefault()

        // if submitted by hack
        const v1 = validateValue(age)
        const v2 = validateValue(weight)
        const v3 = validateValue(height)
        const v4 = validateValue(goalWeight)
        if (!v1 || !v2 || !v3 || !v4){
            setErrMsg("Invalid Details")
        }

        const reqData = {
            age: Number(age),
            gender: Number(gender),
            height_in_inches: Number(height),
            starting_weight_in_kg: Number(weight),
            pal: Number(pal),
            weekly_goal: Number(weeklyGoal),
            goal_weight: Number(goalWeight)
        }

        setErrMsg('')
        console.log(reqData)

        let res;

        if (!toUpdate){
            res = await createGoal(reqData)
        }

        if (toUpdate) {
            console.log("updating``~~~~~");
            const goalID = goalData?.id
            res = await updateGoal({goalID, ...reqData})
            navigate('/profile')
            return
        }

        console.log(res);

        if (res?.error?.status==="FETCH_ERROR"){
            setErrMsg("Failed to connect")
        }

        if (res?.error){
            console.log("Error:", res?.error);
            setErrMsg("Something went wrong.")
        }

        if (res.data){
            console.log("success:", res.data);
            dispatch(setGoal(res.data))
            navigate('/')
        }

    }

    const topBorderRound = !toUpdate ? 'rounded-t-3xl' : 'lg:rounded-3xl'

  return (
    <div className={`relative bg-white px-4 lg:px-12 pb-8 mt-4 lg:mt-0 ${topBorderRound} lg:rounded-r-none lg:rounded-l-3xl flex flex-col gap-2 justify-start lg:justify-center items-start h-auto min-h-screen lg:h-screen w-full`}>
                            
        <h1 className='text-secondary text-4xl font-semibold mx-auto mt-12 mb-8 lg:mt-0 lg:mx-0 lg:mb-2'>Goal Set Up</h1>

        {errMsg && <h3 className='text-blcklight text-xl font-medium mx-auto mt-4 lg:mt-0 lg:mx-0 lg:mb-4'>{errMsg}</h3>}
            
        <form onSubmit={handleSubmit} className='w-full h-auto flex flex-col gap-2'>

        <div className='flex flex-row gap-2 lg:gap-8 w-screen lg:w-full'>
            <span className='w-1/2 lg:w-1/3'>
            <Input 
            label="Age" 
            type='number' 
            value={age}
            onFocus={()=>{setAgeFocus(true)}}
            onBlur={()=>{setAgeFocus(false)}}
            onChange={(e)=>{setAge(e.target.value)}}/>
            <p className={!validAge && age ? "text-blcklight text-sm pl-2" : "hidden"}>Enter a valid age</p>
            </span>
            
            <span className='w-1/2 lg:w-1/3'>
            <Input 
            label="Height (inches)" 
            type='number' 
            value={height}
            onFocus={()=>{setHeightFocus(true)}}
            onBlur={()=>{setHeightFocus(false)}}
            onChange={(e)=>{setHeight(e.target.value)}}/>
            <p className={!validHeight && height ? "text-blcklight text-sm pl-2" : "hidden"}>Enter a valid height</p>
            </span>
        </div>

        <div className='flex flex-row gap-2 lg:gap-8 w-screen lg:w-full'>
            <span className='w-1/2 lg:w-1/3'>
            <Input 
            label="Weight (kgs)" 
            type='number' 
            value={weight}
            onFocus={()=>{setWeightFocus(true)}}
            onBlur={()=>{setWeightFocus(false)}}
            onChange={(e)=>{setWeight(e.target.value)}}/>
            <p className={!validWeight && weight ? "text-blcklight text-sm pl-2" : "hidden"}>Enter a valid weight</p>
            </span>

            <span className='w-1/2 lg:w-1/3'>
            <Input 
            label="Goal Weight (kgs)" 
            type='number' 
            value={goalWeight}
            onFocus={()=>{setGoalWeightFocus(true)}}
            onBlur={()=>{setGoalWeightFocus(false)}}
            onChange={(e)=>{setGoalWeight(e.target.value)}}/>
            <p className={!validGoalWeight && goalWeight ? "text-blcklight text-sm pl-2" : "hidden"}>Enter a valid goal weight</p>
            </span>
        </div>

        <label htmlFor='gender' className='inline-block pl-2 mt-4 text-secondary text-l font-medium'>Select Gender</label>
        <select className='px-3 py-2 rounded-xl bg-white outline-none focus:bg-green-50 duration-200 border-2 border-secondary text-secondary w-full h-12 lg:w-1/2' id='gender' value={gender} onChange={(e)=>{setGender(e.target.value)}}>
            <option value="0">Male</option>
            <option value="1">Female</option>
        </select>

        <label htmlFor='pal' className='inline-block pl-2 mt-2 text-secondary text-l font-medium'>Select Physical Activity Level</label>
        <select className='px-3 py-2 rounded-xl bg-white outline-none focus:bg-green-50 duration-200 border-2 border-secondary text-secondary w-full h-12 lg:w-1/2' id='pal' value={pal} onChange={(e)=>{setPal(e.target.value)}}>
            <option value="1.40">Extremely Inactive</option>
            <option value="1.55">Sedentary</option>
            <option value="1.80">Moderately Active</option>
            <option value="2.2">Vigorously Active</option>
            <option value="2.4">Extremely Active</option>
        </select>

        <label htmlFor='weeklygoal' className='inline-block pl-2 mt-2 text-secondary text-l font-medium'>Select Weekly Goal</label>
        <select className='px-3 py-2 rounded-xl bg-white outline-none focus:bg-green-50 duration-200 border-2 border-secondary text-secondary w-full h-12 lg:w-1/2' id='weeklygoal' value={weeklyGoal} onChange={(e)=>{setWeeklyGoal(e.target.value)}}>
            <option value="-0.25">Lose 0.25Kgs per week</option>
            <option value="-0.5">Lose 0.5Kgs per week</option>
            <option value="-1">Lose 1Kg per week</option>
            <option value="1">Gain 1Kg per week</option>
            <option value="0.5">Gain 0.5Kgs per week</option>
            <option value="0.25">Gain 0.25Kgs per week</option>
        </select>

        <div className='w-full flex flex-row items-center justify-between px-8 mt-4'>
            <PrimaryBtn 
            className='mt-2 w-2/5 h-12'
            type="submit" 
            value='Set Goal' 
            isLoading={toUpdate ? updateGoalLoading : createGoalLoading}
            disabled={!validAge || !validHeight || !validWeight || !validGoalWeight ? true : false}/>

            {toUpdate && 
            <SecondaryBtn
            className='mt-2 w-2/5 h-12'
            value='Cancel'
            onClick={()=>(closeModal())}
            />}
        </div>

        </form>

    </div>
  )
}

export default GoalSettingForm