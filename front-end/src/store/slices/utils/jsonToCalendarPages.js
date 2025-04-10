export default function jsonToCalendarPages(jsonData) {
  const newCalendarPages = [];

  try {
    const calendarPagesArray = JSON.parse(jsonData);
    if (
      Object.prototype.toString.call(calendarPagesArray) !== "[object Array]" ||
      calendarPagesArray.length !== 28
    ) {
      throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
    }

    for (let i = 0; i < 28; i++) {
      const calendarArray = calendarPagesArray[i];
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
        if (!cp.x || !cp.y) {
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

      loadedCalendarPage.calendarId = calendarArray.length + 1;

      newCalendarPages.push(loadedCalendarPage);
    }
  } catch (e) {
    alert(e.message);
    return null;
  }

  return newCalendarPages;
}
