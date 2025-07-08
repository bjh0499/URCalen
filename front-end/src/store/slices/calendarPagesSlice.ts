import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type CalendarPagesSliceState from "../../class/CalendarPagesSliceState";
import type DeleteCalendarInput from "../../class/DeleteCalendarInput";
import type UpdateCalendarInput from "../../class/UpdateCalendarInput";
import type AddImageInput from "../../class/AddImageInput";
import type DeleteImageInput from "../../class/DeleteImageInput";
import type UpdateImageInput from "../../class/UpdateImageInput";
import type LoadCalendarPagesInput from "../../class/LoadCalendarPagesInput";
import type CopyCalendarPageInput from "../../class/CopyCalendarPageInput";

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
    addCalendar: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      const newCalendarId = state.calendarPages[idx].lastWidgetId;
      state.calendarPages[idx].widgetList[newCalendarId] = {
        widgetType: "Calendar",
        option: {
          lang: "KO",
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        size: {
          width: 320,
          height: 320,
        },
      };

      state.calendarPages[idx].widgetKeyList.push(newCalendarId);

      state.calendarPages[idx].lastWidgetId++;
    },
    deleteCalendar: (state, action: PayloadAction<DeleteCalendarInput>) => {
      const idx = action.payload.idx;
      const deleteCalendarKey = action.payload.deleteCalendarKey;

      const prev = state.calendarPages[idx].widgetKeyList;
      const removeIndex = prev.indexOf(deleteCalendarKey);
      state.calendarPages[idx].widgetKeyList = [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];

      state.calendarPages[idx].widgetList[deleteCalendarKey] = null;
    },
    updateCalendar: (state, action: PayloadAction<UpdateCalendarInput>) => {
      const idx = action.payload.idx;
      const updateCalendarId = action.payload.updateCalendarKey;
      const existingCalendar =
        state.calendarPages[idx].widgetList[updateCalendarId];

      if (existingCalendar) {
        const type = action.payload.type;
        const newValue = action.payload.newValue;

        if (type === "option") {
          existingCalendar.option = newValue as WidgetOption;
        } else if (type === "position") {
          existingCalendar.position = newValue as WidgetPosition;
        } else if (type === "size") {
          existingCalendar.size = newValue as WidgetSize;
        }
      }
    },
    addImage: (state, action: PayloadAction<AddImageInput>) => {
      const idx = action.payload.idx;
      const newImageId = state.calendarPages[idx].lastWidgetId;
      state.calendarPages[idx].widgetList[newImageId] = {
        widgetType: "Image",
        data: action.payload.img,
        option: {},
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        size: {
          width: 320,
          height: 320,
        },
      };

      state.calendarPages[idx].widgetKeyList.push(newImageId);

      state.calendarPages[idx].lastWidgetId++;
    },
    deleteImage: (state, action: PayloadAction<DeleteImageInput>) => {
      const idx = action.payload.idx;
      const deleteImageKey = action.payload.deleteImageKey;

      const prev = state.calendarPages[idx].widgetKeyList;
      const removeIndex = prev.indexOf(deleteImageKey);
      state.calendarPages[idx].widgetKeyList = [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];

      state.calendarPages[idx].widgetList[deleteImageKey] = null;
    },
    updateImage: (state, action: PayloadAction<UpdateImageInput>) => {
      const idx = action.payload.idx;
      const updateImageKey = action.payload.updateImageKey;
      const existingImage = state.calendarPages[idx].widgetList[updateImageKey];

      if (existingImage) {
        const type = action.payload.type;
        const newValue = action.payload.newValue;

        if (type === "option") {
          existingImage.option = newValue as WidgetOption;
        } else if (type === "position") {
          existingImage.position = newValue as WidgetPosition;
        } else if (type === "size") {
          existingImage.size = newValue as WidgetSize;
        }
      }
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
  addCalendar,
  deleteCalendar,
  updateCalendar,
  addImage,
  deleteImage,
  updateImage,
  saveCalendarPages,
  loadCalendarPages,
  resetCalendarPages,
  copyCalendarPage,
} = calendarPagesSlice.actions;
export default calendarPagesSlice.reducer;
