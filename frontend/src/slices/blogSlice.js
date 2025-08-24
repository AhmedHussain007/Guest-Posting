import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  selectedBlog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
  },
});

export const { setBlogs, setSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
