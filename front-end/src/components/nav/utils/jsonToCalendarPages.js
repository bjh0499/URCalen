import typeCheck from "./typeCheck";

export default function jsonToCalendarPages(jsonData) {
  const newCalendarData = {};
  newCalendarData.calendarTitle = "";
  newCalendarData.calendarPages = [];

  try {
    const loadedCalendarData = JSON.parse(jsonData);
    if (
      !typeCheck(loadedCalendarData, "[object Object]") ||
      !typeCheck(loadedCalendarData.calendarTitle, "[object String]") ||
      !typeCheck(loadedCalendarData.calendarPages, "[object Array]") ||
      loadedCalendarData.calendarPages.length !== 28
    ) {
      throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
    }

    newCalendarData.calendarTitle = loadedCalendarData.calendarTitle;

    for (let i = 0; i < 28; i++) {
      const calendarArray = loadedCalendarData.calendarPages[i];
      for (let j = 0; j < calendarArray.length; j++) {
        const c = calendarArray[j];
        if (!c.calendarOption || !c.calendarPosition || !c.calendarSize) {
          throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
        }

        // TODO: ENUM 등 형식을 고려해서 외부에서 불러오는 방식을 고려 중
        let cp = c.calendarOption;
        if (!cp.lang || !["KO", "EN"].includes(cp.lang)) {
          throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
        }

        cp = c.calendarPosition;
        if (Number.parseInt(cp.x) === NaN || Number.parseInt(cp.y) === NaN) {
          throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
        }

        cp = c.calendarSize;
        if (!cp.width || !cp.height || cp.width < 320 || cp.height < 320) {
          throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
        }
      }

      const loadedCalendarPage = {};
      loadedCalendarPage.calendarKeyList = [];
      loadedCalendarPage.calendarOption = {};
      loadedCalendarPage.calendarPosition = {};
      loadedCalendarPage.calendarSize = {};

      for (let i = 1; i <= calendarArray.length; i++) {
        loadedCalendarPage.calendarOption[i] = JSON.parse(
          JSON.stringify(calendarArray[i - 1].calendarOption)
        );

        loadedCalendarPage.calendarPosition[i] = JSON.parse(
          JSON.stringify(calendarArray[i - 1].calendarPosition)
        );

        loadedCalendarPage.calendarSize[i] = JSON.parse(
          JSON.stringify(calendarArray[i - 1].calendarSize)
        );

        loadedCalendarPage.calendarKeyList.push(i);
      }

      loadedCalendarPage.calendarId = calendarArray.length;

      newCalendarData.calendarPages.push(loadedCalendarPage);
    }
  } catch (e) {
    alert(e.message);
    return null;
  }

  return newCalendarData;
}
