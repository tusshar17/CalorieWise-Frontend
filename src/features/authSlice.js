import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_email: null,
    is_verified: false,
    access_token: null,
    refresh_token: null,
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
        setToken:(state, action) => {
            console.log("action pay", action.payload);
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        },
        clearToken: (state) => {
            state.access_token = null
            state.refresh_token = null
        }
    }
})



export const { setUserEmail, removeUserEmail, setVerified, resetVerified, setToken, clearToken } = authSlice.actions

export default authSlice.reducer

export const getTokens = (state) => state.auth.access_token