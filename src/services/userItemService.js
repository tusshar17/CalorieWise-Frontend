import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getTokens} from '../features/authSlice'
import {backend} from '../config'

export const userItemApi = createApi({
    reducerPath: "userItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backend}/api/user-item/`,
        prepareHeaders: (headers, {getState}) => {
            const state = getState()
            const access_token = getTokens(state)
            if (access_token){
                headers.set("Authorization", `Bearer ${access_token}`)
            } 
            return headers
        }
    }),
    tagTypes: ['FoodItems'],
    endpoints: (builder)=>({
        createFoodItem: builder.mutation({
            query: (data)=>{
                return {
                    url: "food-item/",
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['FoodItems'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        updateFoodItem: builder.mutation({
            query: ({id, ...patch})=>{
                return {
                    url: `food-item/${id}/`,
                    method: "PATCH",
                    body: patch,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['FoodItems'],
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

        deleteFoodItem: builder.mutation({
            query: (id)=>{
                return {
                    url: `food-item/${id}/`,
                    method: "DELETE",
                    body: '',
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['FoodItems'],
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

        getFoodItems: builder.query({
            query: () => 'food-item',
            providesTags: (result) =>
                result
                  ? // If the query is successful, return an array of tags with id for each post
                    [...result.map(({ id }) => ({ type: 'FoodItems', id })), 'FoodItems']
                  : // If the query fails, return an empty array
                    ['FoodItems'],
        
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

        searchFoodItems: builder.query({
            query: (query) => `search-food-item/${query}`,
            providesTags: (result) =>
                result
                  ? // If the query is successful, return an array of tags with id for each post
                    [...result.map(({ id }) => ({ type: 'FoodItems', id })), 'FoodItems']
                  : // If the query fails, return an empty array
                    ['FoodItems'],
        
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

        createRecipe: builder.mutation({
            query: (data)=>{
                return {
                    url: "recipe/",
                    method: "POST",
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['FoodItems'],
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data, meta} = await queryFulfilled;
                    console.log("status code:", meta.response.status);
                } catch (error) {
                    console.log("Error:", error);
                }
            }
        }),

        getRecipes: builder.query({
            query: () => 'recipe/',
            providesTags: (result) =>
                result
                  ? // If the query is successful, return an array of tags with id for each post
                    [...result.map(({ id }) => ({ type: 'FoodItems', id })), 'FoodItems']
                  : // If the query fails, return an empty array
                    ['FoodItems'],
        
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

        updateRecipe: builder.mutation({
            query: ({recipeID, ...patch})=>{
                return {
                    url: `recipe/${recipeID}/`,
                    method: "PATCH",
                    body: patch,
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['FoodItems'],
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

        deleteRecipe: builder.mutation({
            query: (recipeID)=>{
                return {
                    url: `recipe/${recipeID}/`,
                    method: "DELETE",
                    body: '',
                    headers: {
                        "Content-type": "application/json",
                    }
                }
            },
            invalidatesTags: ['FoodItems'],
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
        
    })
})



export const { useCreateFoodItemMutation, useGetFoodItemsQuery, useUpdateFoodItemMutation, useDeleteFoodItemMutation, useSearchFoodItemsQuery, useCreateRecipeMutation, useGetRecipesQuery, useUpdateRecipeMutation, useDeleteRecipeMutation } = userItemApi
