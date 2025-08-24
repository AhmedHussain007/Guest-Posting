import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApiSlice = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // your backend base URL
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Blog", id })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),

    getBlogBySlug: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
    }),

    createBlog: builder.mutation({
      query: (formData) => ({
        url: "/blogs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Blog", id: "LIST" }],
    }),
    updateBlog: builder.mutation({
      query: ({ blog, data }) => {
        return {
          url: `/blogs/${blog}`, // dynamic URL with blog slug
          method: "PUT", // or PATCH if your backend supports partial updates
          body: data, // should be FormData for images
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Blog", id },
        { type: "Blog", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} = blogApiSlice;
