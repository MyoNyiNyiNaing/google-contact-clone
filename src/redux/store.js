import { configureStore } from "@reduxjs/toolkit";
import { contactApi } from "./api/contactApi";
import authSlice from "./services/authSlice";
import contactSlice from "./services/contactSlice";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    authSlice: authSlice,
    contactSlice: contactSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,contactApi.middleware, userApi.middleware),
});
