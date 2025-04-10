import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: null,
  clickX: null,
  clickY: null,
  calendarX: null,
  calendarY: null,
};

const rightClickSlice = createSlice({
  name: "selectedMonth",
  initialState,
  reducers: {
    setRightClick: (state, action) => {
      state.key = action.payload.key;
      state.clickX = action.payload.clickX;
      state.clickY = action.payload.clickY;
      state.calendarX = action.payload.calendarX;
      state.calendarY = action.payload.calendarY;
    },
    resetRightClick: (state, action) => {
      state.key = null;
      state.clickX = null;
      state.clickY = null;
      state.calendarX = null;
      state.calendarY = null;
    },
  },
});

export const { setRightClick, resetRightClick } = rightClickSlice.actions;
export default rightClickSlice.reducer;
