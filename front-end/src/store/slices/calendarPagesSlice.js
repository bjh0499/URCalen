import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendarPages: [],
};

for (let i = 0; i < 28; i++) {
  const calendarPageObj = {};
  calendarPageObj.calendarId = 0;
  calendarPageObj.calendarKeyList = [];
  calendarPageObj.calendarOption = {};
  calendarPageObj.calendarPosition = {};
  calendarPageObj.calendarSize = {};
  initialState.calendarPages.push(calendarPageObj);
}

const calendarPagesSlice = createSlice({
  name: "calendarPages",
  initialState,
  reducers: {
    addCalendar: (state, action) => {
      const idx = action.payload.idx;
      const newCalendarId = state.calendarPages[idx].calendarId;

      state.calendarPages[idx].calendarOption[newCalendarId] = { lang: "KO" };
      state.calendarPages[idx].calendarPosition[newCalendarId] = { x: 0, y: 0 };
      state.calendarPages[idx].calendarSize[newCalendarId] = { x: 320, y: 320 };

      state.calendarPages[idx].calendarKeyList.push(newCalendarId);
      state.calendarPages[idx].calendarId++;
    },
    deleteCalendar: (state, action) => {
      const idx = action.payload.idx;
      const deleteCalendarId = action.payload.calendarKey;

      state.calendarPages[idx].calendarOption[deleteCalendarId] = undefined;
      state.calendarPages[idx].calendarPosition[deleteCalendarId] = undefined;
      state.calendarPages[idx].calendarSize[deleteCalendarId] = undefined;

      const prev = state.calendarPages[idx].calendarKeyList;
      const removeIndex = prev.indexOf(deleteCalendarId);
      state.calendarPages[idx].calendarKeyList = [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];
    },
    changeCalendar: (state, action) => {
      const idx = action.payload.idx;
      const updateCalendarId = action.payload.calendarKey;
      const type = action.payload.type;
      const obj = action.payload.obj;

      if (type === "calendarOption") {
        state.calendarPages[idx].calendarOption[updateCalendarId] = obj;
      } else if (type === "calendarPosition") {
        state.calendarPages[idx].calendarPosition[updateCalendarId] = obj;
      } else if (type === "calendarSize") {
        state.calendarPages[idx].calendarSize[updateCalendarId] = obj;
      }
    },
    saveCalendarPages: (state, action) => {},
    loadCalendarPages: (state, action) => {},
  },
});

export const {
  addCalendar,
  deleteCalendar,
  updateCalendar,
  saveCalendarPages,
  loadCalendarPages,
} = calendarPagesSlice.actions;
export default calendarPagesSlice.reducer;
