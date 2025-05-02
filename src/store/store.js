import { configureStore } from "@reduxjs/toolkit";
import { registerReducer, loginReducer } from "../app/accountSlice";
import api from "../api/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export default store;
