import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

const user = Cookies.get("user");
const token = Cookies.get("token");

if (user && token) {
  initialState.user = JSON.parse(user);
  initialState.token = token;
}

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      Cookies.set("user", JSON.stringify(state.user));
      Cookies.set("token", state.token);
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;