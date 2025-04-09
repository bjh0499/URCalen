import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import calendarPagesReducer from "./slices/calendarPagesSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    calendarPages: calendarPagesReducer,
  },
});

export default store;
