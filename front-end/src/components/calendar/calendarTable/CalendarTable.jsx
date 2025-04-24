import { useSelector } from "react-redux";

import CalendarRow from "./CalendarRow";
import CalendarTopRow from "./CalendarTopRow";

export default function CalendarTable({ calendarKey, holidays, sizeState }) {
  const selectedYear = useSelector((state) => state.selectedMonth.year);
  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  let inputDay = new Date(selectedYear, selectedMonth - 1, 1);
  while (inputDay.getDay() > 0) {
    inputDay = new Date(inputDay.valueOf() - 86400000);
  }

  let calendarRows = [];
  for (let i = 0; i < 5; i++) {
    let dayList = [];
    for (let j = 0; j < 7; j++) {
      dayList.push({
        year: inputDay.getFullYear(),
        month: inputDay.getMonth(),
        date: inputDay.getDate(),
        day: inputDay.getDay(),
      });
      inputDay = new Date(inputDay.valueOf() + 86400000);
    }
    calendarRows.push(
      <CalendarRow
        key={i}
        calendarKey={calendarKey}
        dayList={dayList}
        holidays={holidays}
        sizeState={sizeState}
      />
    );
  }

  return (
    <div className="flex-col-center h-4/5 w-full">
      <CalendarTopRow calendarKey={calendarKey} sizeState={sizeState} />
      {calendarRows}
    </div>
  );
}
