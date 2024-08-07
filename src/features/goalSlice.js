import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goal_calories: null,
    goal_protein: null,
    goal_carbs: null,
    goal_fats: null,
    goal_sugar: null,
    age: null,
    gender: null,
    height_in_inches: null,
    starting_weight_in_kg: null,
    goal_weight: null,
    pal: null,
    weekly_goal: null,
    last_updated: null
}


export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers:{
        setGoal: (state, action) => {
            console.log("goalslice:", action.payload);
            const goal_keys = Object.keys(action.payload)
            console.log("goalkeys", goal_keys);
            goal_keys.forEach(element => {
                state[element] = action.payload[element]
            });
        },

        clearGoal: (state) => {
            state = {}
        }
        
    }
})



export const { setGoal, clearGoal } = goalSlice.actions

export default goalSlice.reducer