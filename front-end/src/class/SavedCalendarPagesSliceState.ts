import type SavedCalendarPage from "./SavedCalendarPage";

type SavedCalendarPagesSliceState = {
  calendarTitle: string;
  calendarPages: Array<SavedCalendarPage>;
};

export default SavedCalendarPagesSliceState;
