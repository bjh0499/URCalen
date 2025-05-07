import { createSlice } from "@reduxjs/toolkit";

import arrangeCalendarPages from "./utils/arrangeCalendarPages";

const initialState = {
  calendarTitle: "",
  calendarPages: [],
};

for (let i = 0; i < 28; i++) {
  const calendarPageObj = {
    calendarId: 0,
    calendarKeyList: [],
    calendarOption: {},
    calendarPosition: {},
    calendarSize: {},
    imageId: 0,
    imageKeyList: [],
    imageData: {},
    imagePosition: {},
    imageSize: {},
  };
  initialState.calendarPages.push(calendarPageObj);
}

const calendarPagesSlice = createSlice({
  name: "calendarPages",
  initialState,
  reducers: {
    setCalendarTitle: (state, action) => {
      state.calendarTitle = action.payload.calendarTitle;
    },
    addCalendar: (state, action) => {
      const idx = action.payload.idx;
      const newCalendarId = state.calendarPages[idx].calendarId;

      state.calendarPages[idx].calendarOption[newCalendarId] = { lang: "KO" };
      state.calendarPages[idx].calendarPosition[newCalendarId] = { x: 0, y: 0 };
      state.calendarPages[idx].calendarSize[newCalendarId] = {
        width: 320,
        height: 320,
      };

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
    updateCalendar: (state, action) => {
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
    addImage: (state, action) => {
      const idx = action.payload.idx;
      const newImageId = state.calendarPages[idx].imageId;

      state.calendarPages[idx].imageData[newImageId] = action.payload.img;
      state.calendarPages[idx].imagePosition[newImageId] = { x: 0, y: 0 };
      state.calendarPages[idx].imageSize[newImageId] = {
        width: 320,
        height: 320,
      };

      state.calendarPages[idx].imageKeyList.push(newImageId);

      state.calendarPages[idx].imageId++;
    },
    deleteImage: (state, action) => {
      // TODO: 이미지 삭제
    },
    updateImage: (state, action) => {
      // TODO: 이미지 위치, 크기 변경
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
