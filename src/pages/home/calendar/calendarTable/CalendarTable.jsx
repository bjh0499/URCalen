import React from "react";

import CalendarRow from "./CalendarRow";
import CalendarTopRow from "./CalendarTopRow";

export default function CalendarTable({ monthSelector, holidays, sizeState }) {
  let inputDay = new Date(monthSelector.year, monthSelector.month, 1);
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
        dayList={dayList}
        monthSelector={monthSelector}
        holidays={holidays}
        sizeState={sizeState}
      />
    );
  }

  return (
    <div className="h-4/5 w-full flex flex-col justify-center items-center">
      <CalendarTopRow sizeState={sizeState} />
      {calendarRows}
    </div>
  );
}
