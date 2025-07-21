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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
