import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import arrangeCalendarPages from "./utils/arrangeCalendarPages";
import type CalendarPagesSliceState from "../../class/CalendarPagesSliceState";
import type CalendarPage from "../../class/CalendarPage";
import type DeleteCalendarInput from "../../class/DeleteCalendarInput";
import UpdateCalendarInput from "../../class/UpdateCalendarInput";
import AddImageInput from "../../class/AddImageInput";

const initialState: CalendarPagesSliceState = {
  calendarTitle: "",
  calendarPages: [],
};

for (let i = 0; i < 28; i++) {
  const calendarPageObj: CalendarPage = {
    lastWidgetId: 0,
    widgetKeyList: [],
    widgetList: [],
  };
  initialState.calendarPages.push(calendarPageObj);
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
        widgetType: "calendar",
        data: null,
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

        // TODO: Union 타입을 분리하는 방안 필요
        if (type === "option") {
          existingCalendar.option = newValue;
        } else if (type === "position") {
          existingCalendar.position = newValue;
        } else if (type === "size") {
          existingCalendar.size = newValue;
        }
      }
    },
    addImage: (state, action: PayloadAction<AddImageInput>) => {
      const idx = action.payload.idx;
      const newImageId = state.calendarPages[idx].lastWidgetId;
      state.calendarPages[idx].widgetList[newImageId] = {
        widgetType: "image",
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
    deleteImage: (state, action) => {
      const idx = action.payload.idx;
      const deleteImageId = action.payload.imageId;

      state.calendarPages[idx].imageData[deleteImageId] = undefined;
      state.calendarPages[idx].imagePosition[deleteImageId] = undefined;
      state.calendarPages[idx].imageSize[deleteImageId] = undefined;

      const prev = state.calendarPages[idx].imageKeyList;
      const removeIndex = prev.indexOf(deleteImageId);
      state.calendarPages[idx].imageKeyList = [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];
    },
    updateImage: (state, action) => {
      const idx = action.payload.idx;
      const updateImageId = action.payload.imageId;
      const type = action.payload.type;
      const obj = action.payload.obj;

      if (type === "imagePosition") {
        state.calendarPages[idx].imagePosition[updateImageId] = obj;
      } else if (type === "imageSize") {
        state.calendarPages[idx].imageSize[updateImageId] = obj;
      }
    },
    saveCalendarPages: (state, action) => {
      const jsonData = JSON.stringify(arrangeCalendarPages(state));
      if (action.payload.type === "local") {
        // https://codesandbox.io/p/sandbox/export-js-object-to-json-download-file-react-4t2xb?file=%2Fsrc%2FApp.js%3A69%2C5-69%2C18
        const link = document.createElement("a");
        link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(
          jsonData
        )}`;
        link.download = "data.json";
        link.click();
        link.remove();
      } else if (action.payload.type === "server") {
        const customCalendar = {};

        // TODO: 달력 제목을 정하는 부분은 추후 추가
        customCalendar.title = "달력 제목";
        customCalendar.calendarPagesData = jsonData;
        // TODO: 사진 업로드 부분은 추후 추가
        customCalendar.imageData = "";
        customCalendar.isPublic = formData.isPublic;

        // TODO: Backend와 교신하는 부분은 추후 추가
        /*
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
    loadCalendarPages: (state, action) => {
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
    resetCalendarPages: (state, action) => {
      for (let i = 0; i < 28; i++) {
        const blankCalendarPageObj = {
          calendarId: 0,
          calendarKeyList: [],
          calendarOption: {},
          calendarPosition: {},
          calendarSize: {},
          imageId: 0,
          imageKeyList: [],
          imagePosition: {},
          imageSize: {},
        };
        state.calendarPages[i] = blankCalendarPageObj;
      }
    },
    copyCalendarPage: (state, action) => {
      const srcIdx = (action.payload.srcMonth << 1) + !action.payload.srcFront;
      const dstIdx = (action.payload.dstMonth << 1) + !action.payload.dstFront;
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
