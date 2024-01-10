/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

// reduce slice to handle fetching of posts for user

const initialState = {
  post: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;

export function SetPosts(post) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.getPosts(post));
  };
}
