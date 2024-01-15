import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-cxvxikmjv-joy5k.vercel.app",
    // baseUrl: "http://localhost:5000",
   
  }),
  tagTypes:["todo"],
  endpoints: (builder) => ({
  
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams()
        if (priority) {
          params.append('priority',priority)
        }
        return {
          url: "/tasks",
          method: "GET",
          params:params
        }
      },
      providesTags: ['todo']
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body:data
      }),
      invalidatesTags:["todo"]
    }),
    updateTodo: builder.mutation({
      query: (options) => {
     const  data=options.data
        return {
          url: `/task/${options.id}`,
          method: "put",
          body:data
        }
      },
      invalidatesTags:["todo"]
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        console.log(id);
        return   (
          {
            url: `/task/${id.id}`, method: "DELETE",
          })
      },
      invalidatesTags:["todo"]
    }),
  }),
});




export const { useGetTodosQuery,useAddTodoMutation,useDeleteTodoMutation,useUpdateTodoMutation} = baseApi