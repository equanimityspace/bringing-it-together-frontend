import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { storeToken } from "./tokenService";

// register
const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
