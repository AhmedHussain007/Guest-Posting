import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "@/slices/authSlice";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth", // ⬅️ removed trailing slash
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("🔹 signupUser onQueryStarted fired with:", arg);
        try {
          const { data } = await queryFulfilled;
          console.log("🔹 signupUser response:", data);
          if (data?.user) {
            dispatch(setCredentials({ user: data.user, token: data.token || null }));
          }
        } catch (err) {
          console.error("Signup failed:", err);
          dispatch(clearCredentials());
        }
      },
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("🔹 loginUser onQueryStarted fired with:", arg);
        try {
          const { data } = await queryFulfilled;
          console.log("🔹 loginUser response:", data);
          if (data?.user) {
            dispatch(setCredentials({ user: data.user, token: data.token || null }));
          }
        } catch (err) {
          console.error("Login failed:", err);
          dispatch(clearCredentials());
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "/reset-password",
        method: "POST",
        body: { token, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("🔹 logoutUser onQueryStarted fired");
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("Logout failed:", err);
        } finally {
          dispatch(clearCredentials());
        }
      },
    }),
    verifyUser: builder.mutation({
      query: () => ({
        url: "/verify",
        method: "POST",
        credentials: "include"
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("🔹 verifyUser onQueryStarted fired");
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("Verification failed:", err);
        }
      },
    }),
    getMe: builder.query({
      query: () => "/me",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("🔹 /me response:", data);
          if (data?.user) {
            dispatch(setCredentials({ user: data.user, token: data.token || null }));
          }
        } catch (err) {
          console.error("Fetching /me failed:", err);
          dispatch(clearCredentials());
        }
      },
    }),
  })
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
  useVerifyUserMutation,
  useGetMeQuery
} = authApiSlice;
