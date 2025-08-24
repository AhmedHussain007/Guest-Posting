import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice'
import blogReducer from './slices/blogSlice'
import { authApiSlice } from "./apis/authApi";
import { messageApiSlice } from "./apis/messageApi";
import { blogApiSlice } from './apis/blogApi'

export const mystore = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    message: messageReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [blogApiSlice.reducerPath]: blogApiSlice.reducer,
    [messageApiSlice.reducerPath]: messageApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, messageApiSlice.middleware, blogApiSlice.middleware),
});
