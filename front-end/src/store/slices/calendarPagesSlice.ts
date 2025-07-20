import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type CalendarPagesSliceState from "../../class/CalendarPagesSliceState";
import type AddWidgetInput from "../../class/AddWidgetInput";
import type UpdateWidgetInput from "../../class/UpdateWidgetInput";
import type DeleteWidgetInput from "../../class/DeleteWidgetInput";
import type LoadCalendarPagesInput from "../../class/LoadCalendarPagesInput";
import type CopyCalendarPageInput from "../../class/CopyCalendarPageInput";

import type Widget from "../../class/Widget";
import type WidgetOption from "../../class/WidgetOption";
import type WidgetPosition from "../../class/WidgetPosition";
import type WidgetSize from "../../class/WidgetSize";

import arrangeCalendarPages from "./utils/arrangeCalendarPages";

const initialState: CalendarPagesSliceState = {
  calendarTitle: "",
  calendarPages: [],
};

for (let i = 0; i < 28; i++) {
  initialState.calendarPages.push({
    lastWidgetId: 0,
    widgetKeyList: [],
    widgetList: [],
  });
}

const calendarPagesSlice = createSlice({
  name: "calendarPages",
  initialState,
  reducers: {
    setCalendarTitle: (state, action: PayloadAction<string>) => {
      state.calendarTitle = action.payload;
    },
    addWidget: (state, action: PayloadAction<AddWidgetInput>) => {
      const newWidget: Widget = {
        widgetType: action.payload.type,
        position: {
          x: 0,
          y: 0,
          z: 10,
        },
        size: {
          width: 320,
          height: 320,
        },
      };

      switch (action.payload.type) {
        case "Calendar":
          newWidget.option = {
            lang: "KO",
          };
        case "Image":
          newWidget.data = action.payload.data;
          newWidget.option = {};
          break;
        default:
          break;
      }

      const idx = action.payload.idx;
      const newWidgetId = state.calendarPages[idx].lastWidgetId!;
      state.calendarPages[idx].widgetList[newWidgetId] = newWidget;
      state.calendarPages[idx].widgetKeyList.push(newWidgetId);
      state.calendarPages[idx].lastWidgetId!++;
    },
    updateWidget: (state, action: PayloadAction<UpdateWidgetInput>) => {
      const idx = action.payload.idx;
      const updateWidgetId = action.payload.updateWidgetKey;
      const existingWidget =
        state.calendarPages[idx].widgetList[updateWidgetId];

      if (existingWidget) {
        const type = action.payload.type;
        const newValue = action.payload.newValue;

        if (type === "option") {
          existingWidget.option = newValue as WidgetOption;
        } else if (type === "position") {
          existingWidget.position = newValue as WidgetPosition;
        } else if (type === "size") {
          existingWidget.size = newValue as WidgetSize;
        }
      }
    },
    deleteWidget: (state, action: PayloadAction<DeleteWidgetInput>) => {
      const { idx, deleteWidgetKey } = action.payload;
      const prev = state.calendarPages[idx].widgetKeyList;
      const removeIndex = prev.indexOf(deleteWidgetKey);
      state.calendarPages[idx].widgetKeyList = [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];

      state.calendarPages[idx].widgetList[deleteWidgetKey] = null;
    },
    saveCalendarPages: (state, action: PayloadAction<string>) => {
      const jsonData = JSON.stringify(arrangeCalendarPages(state));
      if (action.payload === "local") {
        // https://codesandbox.io/p/sandbox/export-js-object-to-json-download-file-react-4t2xb?file=%2Fsrc%2FApp.js%3A69%2C5-69%2C18
        const link = document.createElement("a");
        link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(
          jsonData
        )}`;
        link.download = "data.json";
        link.click();
        link.remove();
      } else if (action.payload === "server") {
        /*
        const customCalendar = {};

        // TODO: 달력 제목을 정하는 부분은 추후 추가
        customCalendar.title = "달력 제목";
        customCalendar.calendarPagesData = jsonData;
        // TODO: 사진 업로드 부분은 추후 추가
        customCalendar.imageData = "";
        customCalendar.isPublic = formData.isPublic;

        // TODO: Backend와 교신하는 부분은 추후 추가
        try {
          const response = await customCalendarApi.createCustomCalendar(
            customCalendar
          );
          alert("달력이 저장되었습니다.");
        } catch (err) {
          alert("달력 저장 과정에서 오류가 발생했습니다.");
          alert(err);
        }
        */
      }
    },
    loadCalendarPages: (
      state,
      action: PayloadAction<LoadCalendarPagesInput>
    ) => {
      if (action.payload.type === "local") {
        state.calendarTitle = "";
        state.calendarPages = [];
        if (action.payload.data !== null) {
          state.calendarTitle = action.payload.data.calendarTitle;
          state.calendarPages = action.payload.data.calendarPages;
        }
      } else if (action.payload.type === "server") {
      }
    },
    // 원격에서 달력 정보를 불러올 때, 이를 외부적으로 시간 차를 두어 실행시켜야 기존 정보가 유지되는 문제를 해결할 수 있음
    resetCalendarPages: (state) => {
      for (let i = 0; i < 28; i++) {
        state.calendarPages[i] = {
          lastWidgetId: 0,
          widgetKeyList: [],
          widgetList: [],
        };
      }
    },
    copyCalendarPage: (state, action: PayloadAction<CopyCalendarPageInput>) => {
      const srcIdx =
        (action.payload.srcMonth << 1) + (action.payload.srcFront ? 0 : 1);
      const dstIdx =
        (action.payload.dstMonth << 1) + (action.payload.dstFront ? 0 : 1);
      const copiedCalendarPage = JSON.parse(
        JSON.stringify(state.calendarPages[srcIdx])
      );
      state.calendarPages[dstIdx] = copiedCalendarPage;
    },
  },
});

export const {
  setCalendarTitle,
  addWidget,
  updateWidget,
  deleteWidget,
  saveCalendarPages,
  loadCalendarPages,
  resetCalendarPages,
  copyCalendarPage,
} = calendarPagesSlice.actions;
export default calendarPagesSlice.reducer;
