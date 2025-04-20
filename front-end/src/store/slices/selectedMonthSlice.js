import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month: 0,
  front: true,
  isChanged: false,
};

const selectedMonthSlice = createSlice({
  name: "selectedMonth",
  initialState,
  reducers: {
    setMonth: (state, action) => {
      const type = action.payload.type;
      if (type === "month") {
        const newMonth = action.payload.value;
        if (typeof newMonth === "number" && newMonth >= 0 && newMonth <= 13) {
          state.month = newMonth;
        }
      } else if (type === "front") {
        const newFront = action.payload.value;
        if (typeof newFront === "boolean") {
          state.front = newFront;
        }
      }
    },
    setIsChanged: (state, action) => {
      const newIsChanged = action.payload.isChanged;
      if (typeof newIsChanged === "boolean") {
        state.isChanged = newIsChanged;
      }
    },
    resetMonth: (state, action) => {
      state.month = 0;
      state.front = true;
    },
  },
});

export const { setMonth, resetMonth, setIsChanged } =
  selectedMonthSlice.actions;
export default selectedMonthSlice.reducer;
