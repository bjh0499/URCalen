import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import calendarPagesReducer from "./slices/calendarPagesSlice";
import selectedMonthReducer from "./slices/selectedMonthSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    calendarPages: calendarPagesReducer,
    selectedMonth: selectedMonthReducer,
  },
});

export default store;
