import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SelectedWidgetSliceState = {
  selectedWidgetKey: number;
};

const initialState: SelectedWidgetSliceState = {
  selectedWidgetKey: -1,
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
  },
});

export const { setSelectedWidgetKey, resetSelectedWidgetKey } =
  selectedWidgetSlice.actions;

export default selectedWidgetSlice.reducer;
