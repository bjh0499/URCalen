import CalendarPage from "./CalendarPage";

type SelectedPage = {
  selectedYear: number;
  selectedMonth: number;
  isFront: boolean;
  calendarPageIdx: number;
  calendarPage: CalendarPage;
};

export default SelectedPage;
