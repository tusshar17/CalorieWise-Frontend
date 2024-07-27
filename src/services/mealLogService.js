import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getTokens} from '../features/authSlice'
import {backend} from '../config'


export const mealLogApi = createApi({
    reducerPath: "mealLogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backend}/api/meal_logs/`,
        prepareHeaders: (headers, {getState}) => {
            const state = getState()
            const access_token = getTokens(state)
            if (access_token){
                headers.set("Authorization", `Bearer ${access_token}`)
            } 
            return headers
        }
    }),
    tagTypes: ['MealLogs'],
    endpoints: (builder)=>({
        createMealLog: builder.mutation({
            query: (data)=>{
                return {
                    url: "log/",
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['MealLogs'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        updateMealLog: builder.mutation({
            query: ({mealLogID, ...patch})=>{
                console.log("llllll", mealLogID);
                return {
                    url: `log/${mealLogID}/`,
                    method: "PATCH",
                    body: patch,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['MealLogs'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    console.log("updating mealloggg...");
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        deleteWeightRecord: builder.mutation({
            query: (recordID)=>{
                return {
                    url: `record/${recordID}/`,
                    method: "DELETE",
                    body: '',
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['WeightRecords'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    console.log("deleting food item...");
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        getMealLogs: builder.query({
            query: (date) => (`log/?date=${date}`),
            providesTags: ['MealLogs'],
        
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    console.log("init")
                    const {data, meta} = await queryFulfilled;
                    console.log("--xyz--", meta);
                } catch (err) {
                    console.log(err);
                }
            }
        }),

    })
})



export const { useGetMealLogsQuery, useCreateMealLogMutation, useUpdateMealLogMutation } = mealLogApi
