import DayObject from "./DayObject";

type CalendarCellInput = {
  calendarKey: number;
  dayObj: DayObject;
  holidays: Array<DayObject>;
  sizeState: object;
};

export default CalendarCellInput;
