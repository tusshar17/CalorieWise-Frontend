import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {backend} from '../config'
import { getTokens } from "../features/authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backend}/api/user/`,
        prepareHeaders: (headers, {getState}) => {
            const state = getState()
            console.log("state", state);
            const access_token = getTokens(state)
            console.log("fgdg", access_token);
            if (access_token){
                headers.set("Authorization", `Bearer ${access_token}`)
            } 
            return headers
        }
    }),
    tagTypes: ['Auth'],
    endpoints: (builder)=>({
        registerUser: builder.mutation({
            query: (user)=>{
                return {
                    url: "register/",
                    method: "POST",
                    body: user,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['Auth'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),
        getProfile: builder.query({
            query: ()=> 'profile/',
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            },
            providesTags: ['Auth'],
        }),
        renameProfile: builder.mutation({
            query: ({userID, ...data})=>{
                return {
                    url: `update_profile_name/${userID}`,
                    method: "PATCH",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['Auth'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),
        verifyOTP: builder.mutation({
            query: (data)=>{
                return {
                    url: "verify_otp/",
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['Auth'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),
        logInUser: builder.mutation({
            query: (user)=>{
                return {
                    url: "login/",
                    method: "POST",
                    body: user,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['Auth'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),
    })
})



export const { useRegisterUserMutation, useVerifyOTPMutation, useLogInUserMutation, useGetProfileQuery, useRenameProfileMutation } = authApi
