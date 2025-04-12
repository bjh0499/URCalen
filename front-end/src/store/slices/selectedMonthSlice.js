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
      const newMonth = action.payload.month;
      if (typeof newMonth === "number" && newMonth >= 0 && newMonth <= 13) {
        state.month = newMonth;
      }
    },
    setFront: (state, action) => {
      const newFront = action.payload.front;
      if (typeof newFront === "boolean") {
        state.front = newFront;
      }
    },
    resetMonth: (state, action) => {
      state.month = 0;
      state.front = true;
    },
  },
});

export const { setMonth, setFront, resetMonth } = selectedMonthSlice.actions;
export default selectedMonthSlice.reducer;
