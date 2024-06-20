import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_email: null,
    is_verified: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUserEmail:(state, action) => {
            console.log("inside setuseremail");
            state.user_email = action.payload.user_email
        },
        removeUserEmail:(state) => {
            state.user_email = null
        },
        setVerified:(state) => {
            state.is_verified = true
        },
        resetVerified:(state) => {
            state.is_verified = false
        },
    }
})



export const { setUserEmail, removeUserEmail, setVerified, resetVerified } = authSlice.actions

export default authSlice.reducer