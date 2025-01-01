import React from "react";

import CalendarRow from "./CalendarRow";

export default function CalendarTable({ monthSelector }) {
  let inputDay = new Date(monthSelector.year, monthSelector.month, 1);
  while (inputDay.getDay() > 0) {
    inputDay = new Date(inputDay.valueOf() - 86400000);
  }

  let calendarRows = [];
  for (let i = 0; i < 5; i++) {
    let dayList = [];
    for (let j = 0; j < 7; j++) {
      dayList.push({
        month: inputDay.getMonth(),
        date: inputDay.getDate(),
        day: inputDay.getDay(),
      });
      inputDay = new Date(inputDay.valueOf() + 86400000);
    }
    calendarRows.push(
      <CalendarRow key={i} dayList={dayList} monthSelector={monthSelector} />
    );
  }

  return <div>{calendarRows}</div>;
}
