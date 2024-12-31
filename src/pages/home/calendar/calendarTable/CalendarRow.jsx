import React from "react";

import CalendarCell from "./CalendarCell";

export default function CalendarRow({ dayList }) {
  let calendarCells = [];
  dayList.forEach((dayObj, i) => {
    calendarCells.push(<CalendarCell key={i} dayObj={dayObj} />);
  });

  return <div className="flex flex-row">{calendarCells}</div>;
}
