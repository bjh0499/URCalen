import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type SelectedMonthSliceState from "../../class/SelectedMonthSliceState";

const initialState: SelectedMonthSliceState = {
  year: new Date().getFullYear(),
  month: 0,
  front: true,
  isChanged: false,
};

// TODO: setMonth를 setMonth와 setFront로 분리함
// resetMonth를 resetMonthAndFront로 명확하게 이름을 변경
// setMonth, setFront, setIsChanged의 구조가 변경되었으므로, 이에 대한 적용 필수
const selectedMonthSlice = createSlice({
  name: "selectedMonth",
  initialState,
  reducers: {
    plusYear: (state) => {
      state.year = state.year + 1;
    },
    minusYear: (state) => {
      state.year = state.year - 1;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      const newMonth = action.payload;
      if (newMonth >= 0 && newMonth <= 13) {
        state.month = newMonth;
      }
    },
    setFront: (state, action: PayloadAction<boolean>) => {
      state.front = action.payload;
    },
    setIsChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },
    resetMonthAndFront: (state) => {
      state.month = 0;
      state.front = true;
    },
  },
});

export const {
  plusYear,
  minusYear,
  setMonth,
  setFront,
  setIsChanged,
  resetMonthAndFront,
} = selectedMonthSlice.actions;
export default selectedMonthSlice.reducer;
