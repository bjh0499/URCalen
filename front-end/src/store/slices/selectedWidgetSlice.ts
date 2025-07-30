import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SelectedWidgetSliceState = {
  selectedWidgetKey: number;
  startWidgetIdx: number;
};

const initialState: SelectedWidgetSliceState = {
  selectedWidgetKey: -1,
  startWidgetIdx: 0,
};

const selectedWidgetSlice = createSlice({
  name: "selectedWidget",
  initialState,
  reducers: {
    setSelectedWidgetKey: (state, action: PayloadAction<number>) => {
      state.selectedWidgetKey = action.payload;
    },
    resetSelectedWidgetKey: (state) => {
      state.selectedWidgetKey = -1;
    },
    setStartWidgetIdx: (state, action: PayloadAction<number>) => {
      state.startWidgetIdx = action.payload;
    },
    resetStartWidgetIdx: (state) => {
      state.startWidgetIdx = 0;
    },
  },
});

export const {
  setSelectedWidgetKey,
  resetSelectedWidgetKey,
  setStartWidgetIdx,
  resetStartWidgetIdx,
} = selectedWidgetSlice.actions;

export default selectedWidgetSlice.reducer;
