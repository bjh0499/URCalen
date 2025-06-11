import type CalendarPagesSliceState from "../../../class/CalendarPagesSliceState";
import type CalendarPage from "../../../class/CalendarPage";

export default function arrangeCalendarPages(
  state: CalendarPagesSliceState
): CalendarPagesSliceState {
  const calendarData: CalendarPagesSliceState = {
    calendarTitle: state.calendarTitle,
    calendarPages: [],
  };
  const calendarPages = state.calendarPages;
  for (let i = 0; i < 28; i++) {
    const calendarPage: CalendarPage = {
      lastWidgetId: 0,
      widgetKeyList: [],
      widgetList: [],
    };

    for (let j = 0; j < calendarPages[i].widgetKeyList.length; j++) {
      calendarPage.widgetKeyList.push(calendarPage.lastWidgetId);
      calendarPage.widgetList.push(
        calendarPages[i].widgetList[calendarPages[i].widgetKeyList[j]]
      );
      calendarPage.lastWidgetId++;
    }

    calendarData.calendarPages.push(calendarPage);
  }

  return calendarData;
}
