import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getTokens} from '../features/authSlice'


export const goalApi = createApi({
    reducerPath: "goalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.29.181:8000/api/",
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
    endpoints: (builder)=>({
        createGoal: builder.mutation({
            query: (data)=>{
                return {
                    url: "goal/",
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

        getGoal: builder.query({
            query: () => 'goal',
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("--xyz--", meta);
                } catch (err) {
                    console.log(err);
                }
            }
        })
        
    })
})



export const { useCreateGoalMutation, useGetGoalQuery } = goalApi
