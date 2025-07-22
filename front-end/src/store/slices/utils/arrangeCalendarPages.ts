import type CalendarPagesSliceState from "../../../class/CalendarPagesSliceState";
import type SavedCalendarPage from "../../../class/SavedCalendarPage";

type SavedCalendarPagesSliceState = {
  calendarTitle: string;
  calendarPages: Array<SavedCalendarPage>;
};

export default function arrangeCalendarPages(
  state: CalendarPagesSliceState
): SavedCalendarPagesSliceState {
  const savedCalendarData: SavedCalendarPagesSliceState = {
    calendarTitle: state.calendarTitle,
    calendarPages: [],
  };
  const calendarPages = state.calendarPages;
  for (let i = 0; i < 28; i++) {
    const savedCalendarPage: SavedCalendarPage = {
      widgetList: [],
    };

    for (let j = 0; j < calendarPages[i].widgetKeyList.length; j++) {
      savedCalendarPage.widgetList.push(
        calendarPages[i].widgetList[calendarPages[i].widgetKeyList[j]]!
      );
    }

    savedCalendarData.calendarPages.push(savedCalendarPage);
  }

  return savedCalendarData;
}
