import type CalendarPage from "./CalendarPage";

type CalendarPagesSliceState = {
  calendarTitle: string;
  calendarPages: Array<CalendarPage>;
};

export default CalendarPagesSliceState;
