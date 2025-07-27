import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import calendarPagesReducer from "./slices/calendarPagesSlice";
import selectedMonthReducer from "./slices/selectedMonthSlice";
import selectedWidgetReducer from "./slices/selectedWidgetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    calendarPages: calendarPagesReducer,
    selectedMonth: selectedMonthReducer,
    selectedWidget: selectedWidgetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
