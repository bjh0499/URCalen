import CalendarPage from "./CalendarPage";

type CalendarPagesSliceState = {
  calendarTitle: string | null;
  calendarPages: Array<CalendarPage>;
};

export default CalendarPagesSliceState;
