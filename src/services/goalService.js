import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getTokens} from '../features/authSlice'
import {backend} from '../config'


export const goalApi = createApi({
    reducerPath: "goalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backend}/api/`,
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
    tagTypes: ['GoalData'],
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
            invalidatesTags: ['GoalData'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        updateGoal: builder.mutation({
            query: ({goalID, ...data})=>{
                return {
                    url: `goal/${goalID}/`,
                    method: "PATCH",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['GoalData'],
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
            providesTags: ['GoalData'],
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



export const { useCreateGoalMutation, useGetGoalQuery, useUpdateGoalMutation } = goalApi
