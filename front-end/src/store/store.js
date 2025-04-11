import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import calendarPagesReducer from "./slices/calendarPagesSlice";
import selectedMonthReducer from "./slices/selectedMonthSlice";
import modalReducer from "./slices/modalSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    calendarPages: calendarPagesReducer,
    selectedMonth: selectedMonthReducer,
    modal: modalReducer,
  },
});

export default store;
