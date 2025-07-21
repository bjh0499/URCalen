import CalendarPagesSliceState from "./CalendarPagesSliceState";

type LoadCalendarPagesInput = {
  type: "local" | "server";
  data: CalendarPagesSliceState | null;
};

export default LoadCalendarPagesInput;
