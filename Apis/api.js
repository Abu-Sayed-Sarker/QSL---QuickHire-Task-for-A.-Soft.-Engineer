import { base_url } from "@/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: base_url, // Provide base URL here
  prepareHeaders: (headers, { getState }) => {
    // Retrieve token from Redux state
    const token = getState().auth?.accessToken || null;

    // If token is available, set it in the headers
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      // Fallback to `localStorage` if token is missing from Redux state
      const authData = JSON.parse(localStorage.getItem("auth")); // Parse the `auth` object from local storage
      if (authData?.accessToken) {
        headers.set("authorization", `Bearer ${authData.accessToken}`); // Set Authorization header
      }
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Jobs", "Applications"],
  endpoints: (builder) => ({
    // Auth
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // Jobs
    getJobs: builder.query({
      query: (params) => ({
        url: "/jobs",
        params,
      }),
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    createJob: builder.mutation({
      query: (body) => ({
        url: "/jobs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Applications
    submitApplication: builder.mutation({
      query: (body) => ({
        url: "/applications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applications"],
    }),
    getApplications: builder.query({
      query: () => "/applications",
      providesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useSubmitApplicationMutation,
  useGetApplicationsQuery,
  useRegisterMutation,
  useLoginMutation,
} = api;
