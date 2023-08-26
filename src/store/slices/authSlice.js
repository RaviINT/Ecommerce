import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userLogin: null,
};
export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    signUp: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      state.userLogin = action.payload;
    },
    logout: (state, action) => {
      state.userLogin = null;
    },
  },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;
