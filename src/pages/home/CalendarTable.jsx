import React from "react";

import CalendarRow from "./CalendarRow";

export default function CalendarTable() {
  let today = new Date();
  let inputDay = new Date(today.getFullYear(), today.getMonth(), 1);
  while (inputDay.getDay() > 0) {
    inputDay = new Date(inputDay.valueOf() - 86400000);
  }

  let calendarRows = [];
  for (let i = 0; i < 5; i++) {
    let dayList = [];
    for (let j = 0; j < 7; j++) {
      dayList.push({
        date: inputDay.getDate(),
        day: inputDay.getDay(),
      });
      inputDay = new Date(inputDay.valueOf() + 86400000);
    }
    calendarRows.push(<CalendarRow dayList={dayList} />);
  }

  return <div>{calendarRows}</div>;
}
