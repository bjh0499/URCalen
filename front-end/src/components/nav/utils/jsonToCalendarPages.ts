import type CalendarPage from "../../../class/CalendarPage";
import type CalendarPagesSliceState from "../../../class/CalendarPagesSliceState";
import type Widget from "../../../class/Widget";

export default function jsonToCalendarPages(jsonData: string) {
  const newCalendarData: CalendarPagesSliceState = {
    calendarTitle: "",
    calendarPages: [],
  };

  try {
    // TODO: JSON 파일 로딩 시 Type 불일치에 대한 오류와 이에 대한 예외 처리는 추가적인 시험 요구
    const loadedCalendarData: CalendarPagesSliceState = JSON.parse(jsonData);
    if (loadedCalendarData.calendarPages.length !== 28) {
      throw new Error("파일 형식이 올바르지 않거나 손상된 파일입니다.");
    }

    newCalendarData.calendarTitle = loadedCalendarData.calendarTitle;

    for (let i = 0; i < 28; i++) {
      const widgetArray = loadedCalendarData.calendarPages[i].widgetList;
      const loadedCalendarPage: CalendarPage = {
        lastWidgetId: widgetArray.length,
        widgetKeyList: [],
        widgetList: [],
      };

      for (let i = 0; i < widgetArray.length; i++) {
        const loadedWidget: Widget = {
          widgetType: "",
          option: {},
          position: { x: -1, y: -1, z: -1 },
          size: { width: -1, height: -1 },
        };

        loadedWidget.widgetType = JSON.parse(
          JSON.stringify(widgetArray[i]!.widgetType)
        );
        if (widgetArray[i]!.data) {
          loadedWidget.data = JSON.parse(JSON.stringify(widgetArray[i]!.data));
        }
        loadedWidget.option = JSON.parse(
          JSON.stringify(widgetArray[i]!.option)
        );
        loadedWidget.position = JSON.parse(
          JSON.stringify(widgetArray[i]!.position)
        );
        loadedWidget.size = JSON.parse(JSON.stringify(widgetArray[i]!.size));

        loadedCalendarPage.widgetList.push(loadedWidget);
        loadedCalendarPage.widgetKeyList.push(i);
      }

      newCalendarData.calendarPages.push(loadedCalendarPage);
    }
  } catch (e) {
    alert(e.message);
    return null;
  }

  return newCalendarData;
}
