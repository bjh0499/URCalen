import React from "react";

import CalendarCell from "./CalendarCell";

export default function CalendarRow({ dayList, monthSelector, holidays }) {
  let calendarCells = [];
  dayList.forEach((dayObj, i) => {
    calendarCells.push(
      <CalendarCell
        key={i}
        dayObj={dayObj}
        monthSelector={monthSelector}
        holidays={holidays}
      />
    );
  });

  return <div className="flex flex-row">{calendarCells}</div>;
}
