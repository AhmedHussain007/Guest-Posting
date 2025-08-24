import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setMessages, addMessage } from "@/slices/messageSlice";

export const messageApiSlice = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/messages",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessages(data));
        } catch (err) {
          console.error("Fetching messages failed:", err);
        }
      },
    }),

    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/",
        method: "POST",
        body: newMessage,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addMessage(data));
        } catch (err) {
          console.error("Sending message failed:", err);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApiSlice;
