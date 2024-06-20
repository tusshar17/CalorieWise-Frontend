import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./LocalStorageService";

export const goalApi = createApi({
    reducerPath: "goalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.29.181:8000/api/",
        prepareHeaders: (headers) => {
            const {access_token} = getToken()
            if (access_token){
                headers.set("Authorization", `Bearer ${access_token}`)
            } 
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
        
    })
})



export const { useCreateGoalMutation } = goalApi
