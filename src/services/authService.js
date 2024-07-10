import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.29.181:8000/api/user/"
    }),
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



export const { useRegisterUserMutation, useVerifyOTPMutation, useLogInUserMutation } = authApi
