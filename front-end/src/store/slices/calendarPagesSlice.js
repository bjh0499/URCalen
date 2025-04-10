import { createSlice } from "@reduxjs/toolkit";

import arrangeCalendarPages from "./utils/arrangeCalendarPages";
import jsonToCalendarPages from "./utils/jsonToCalendarPages";

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
      state.calendarPages[idx].calendarId++;
      const newCalendarId = state.calendarPages[idx].calendarId;

      state.calendarPages[idx].calendarOption[newCalendarId] = { lang: "KO" };
      state.calendarPages[idx].calendarPosition[newCalendarId] = { x: 0, y: 0 };
      state.calendarPages[idx].calendarSize[newCalendarId] = { x: 320, y: 320 };

      state.calendarPages[idx].calendarKeyList.push(newCalendarId);
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
    saveCalendarPages: (state, action) => {
      const jsonData = JSON.stringify(
        arrangeCalendarPages(state.calendarPages)
      );
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

      // TODO: Modal 제어는 Slice가 아닌 Component에서 진행할 예정
      // setSaveMenu(() => false);
    },
    loadCalendarPages: (state, action) => {
      if (action.payload.type === "local") {
        const restoreProcess = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.addEventListener("load", () => {
            const newCalendarPages = jsonToCalendarPages(reader.result);
            if (newCalendarPages !== null) {
              state.calendarPages = [];

              setTimeout(() => {
                state.calendarPages = newCalendarPages;
              }, 50);
            }
          });

          if (!file) {
            alert("파일이 선택되지 않았습니다.");
          } else if (file.type === "application/json") {
            reader.readAsText(file);
          } else {
            alert("파일 형식이 올바르지 않거나 손상된 파일입니다.");
          }

          // TODO: alert으로 뜨는 오류 메시지를 별도 오류 창으로 표현할 예정
        };

        const file = document.createElement("input");
        file.type = "file";
        file.accept = ".json,data:text/json;chatset=utf-8";
        file.addEventListener("change", restoreProcess);
        file.click();
        file.remove();
      } else if (action.payload.type === "server") {
      }
    },
    copyCalendarPage: (state, action) => {},
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
