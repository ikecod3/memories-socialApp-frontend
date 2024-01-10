/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "./store";
// redux slice to handle login, logout and update user profile actions
const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem("user");
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
  },
});

export default userSlice.reducer;

export function UserLogin(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.login(user));
  };
}
export function logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}
export function UpdateProfile(value) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.updateProfile(value));
  };
}
