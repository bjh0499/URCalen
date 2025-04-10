import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import calendarPagesReducer from "./slices/calendarPagesSlice";
import selectedMonthReducer from "./slices/selectedMonthSlice";
import modalReducer from "./slices/modalSlice";
import rightClickReducer from "./slices/rightClickSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    calendarPages: calendarPagesReducer,
    selectedMonth: selectedMonthReducer,
    modal: modalReducer,
    rightClick: rightClickReducer,
  },
});

export default store;
