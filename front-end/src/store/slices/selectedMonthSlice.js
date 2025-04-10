import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month: 0,
  front: true,
};

const selectedMonthSlice = createSlice({
  name: "selectedMonth",
  initialState,
  reducers: {
    setMonth: (state, action) => {
      state.month =
        action.payload.month !== undefined ? action.payload.month : state.month;
      state.front =
        action.payload.front !== undefined ? action.payload.front : state.front;
    },
  },
});

export const { setMonth } = selectedMonthSlice.actions;
export default selectedMonthSlice.reducer;
