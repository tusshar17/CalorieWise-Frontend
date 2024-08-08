import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getTokens} from '../features/authSlice'
import {backend} from '../config'

export const weightApi = createApi({
    reducerPath: "weightApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backend}/api/weight/`,
        prepareHeaders: (headers, {getState}) => {
            const state = getState()
            const access_token = getTokens(state)
            if (access_token){
                headers.set("Authorization", `Bearer ${access_token}`)
            } 
            return headers
        }
    }),
    tagTypes: ['WeightRecords'],
    endpoints: (builder)=>({
        createWeightRecord: builder.mutation({
            query: (data)=>{
                return {
                    url: "record/",
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['WeightRecords'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        updateWeightRecord: builder.mutation({
            query: ({recordID, ...patch})=>{
                console.log("llllll", recordID);
                return {
                    url: `record/${recordID}/`,
                    method: "PATCH",
                    body: patch,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['WeightRecords'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    console.log("updating food item...");
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

        getWeightRecords: builder.query({
            query: () => 'record',
            // providesTags: (result) =>
            //     result
            //       ? // If the query is successful, return an array of tags with id for each post
            //         [...result.map(({ id }) => ({ type: 'WeightRecords', id })), 'WeightRecords']
            //       : // If the query fails, return an empty array
            //         ['WeightRecords'],
            providesTags: ['WeightRecords'],
        
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

        getWeightRecordsSummary: builder.query({
            query: (range) => `get_from_last_x_days/${range}`,
            providesTags: ['WeightRecords'],
        
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



export const { useCreateWeightRecordMutation, useGetWeightRecordsQuery, useDeleteWeightRecordMutation, useUpdateWeightRecordMutation, useGetWeightRecordsSummaryQuery } = weightApi
